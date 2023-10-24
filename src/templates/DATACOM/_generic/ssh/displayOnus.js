const { connect } = require('../../../../config/ssh-connect')
const { dummy2json, hour2time, column2json } = require('../../../../utils/lib')

/*
  Itf     ONU ID   Serial Number   Oper State   Software Download State      Name
--------  ------   -------------   ----------   --------------------------   ------------------------------------------------
1/1/1     0        DACM918A9682    Down         None                         ONU_teste2
1/1/1     1        DACM91BE1164    Up           None
1/1/1     2        TPLGF43E1868    Up           None
*/

const displayOnus = async (options) => {
  const cmd = 'show interface gpon onu'
  const conn = await connect(options)
  const chunk = await conn.execDatacom(cmd)
  if (!chunk && chunk === '') return null

  const splitted = chunk.split('\r\n')
  splitted.shift()
  splitted.pop()
  
  const columns = [
    [0, 8],
    [8, 19],
    [19, 35],
    [35, 48],
    [48, 76],
    [76, 99],
  ]

	const data = dummy2json(splitted.join('\n'), columns, 1)

  let cmd2 = '';
  for (let i = 0; i < data.length; i++) {
    cmd2 += `show interface gpon ${data[i]['itf_--------']} onu ${data[i]['onuid_------']} | nomore
    `;
  }

  const chunkOnu = await conn.execDatacom(cmd2)

  const splitted2 = chunkOnu.split('\r\n')
  splitted2.pop()

  const onuFiltered = splitted2.filter(item => item !== '');

  const onuGroup = []
  let onu = {}

  for (const row of onuFiltered) {
    if (row.includes('show')) {
      if (onu.length > 0) {
        onuGroup.push(onu);
        onu = {};
      }
      onu = [row]
    } else {
      //Por conta da hora foi adicionado essa condição
      if (row.includes('Uptime')) {
        const parts = row.split('                  :');
        if (parts.length === 2) {
          const key = parts[0].trim();
          const value = parts[1].trim();
          onu[key] = value;
          continue;
        }
      }

      const parts = row.split(':');
      if (parts.length === 2) {
        const key = parts[0].trim();
        const value = parts[1].trim();
        onu[key] = value;
      }
    }
  }

  if (Object.keys(onu).length > 0) {
    onuGroup.push(onu);
  }

	return onuGroup.map((item) => {
    const dirtyData = item[0]
    const dataFiltered = dirtyData.match(/interface\s(.*?)\sonu/);
    const interface = dataFiltered ? dataFiltered[1] : null;

    return {
      board: interface.split('/')[0].split(' ')[1],
      slot: interface.split('/')[1],
      port: interface.split('/')[2],
      ont_id: item['ID'],
      serial_number: item['Serial Number'],
      pon_type: interface.split('/')[0].split(' ')[0],
      uptime_at: hour2time(item['Uptime'] || ''),
      onu_type: item.onu || '',
      operational_state: item['Operational state'],
      name: item['Name'],
      catv_rx_power: 0,
      stage: null,
      temperature: null,
      tx_power: parseFloat((item['Tx Optical Power [dBm]'] || '0').toLowerCase().replace('dbm', '').trim().replace(/ /gi, ''), 10) || '',
      rx_power: parseFloat((item['Rx Optical Power [dBm]'] || '0').toLowerCase().replace('dbm', '').trim().replace(/ /gi, ''), 10) || '',
      distance: parseInt(item['Distance'] || '0', 10),   
      mac_adress: item.mac || '',
      onu_external_id: item.external_id || '',
      authorization_at: new Date(),
    }
	})
}

module.exports = displayOnus
