const { connect } = require('../../../../config/ssh-connect')
const { dummy2json, hour2time, column2json } = require('../../../../utils/lib')

/*
  Itf     ONU ID   Serial Number   Oper State   Software Download State      Name
--------  ------   -------------   ----------   --------------------------   ------------------------------------------------
1/1/1     0        DACM918A9682    Down         None                         ONU_teste2
1/1/1     1        DACM91BE1164    Up           None
1/1/1     2        TPLGF43E1868    Up           None
*/

const STATUS = {
  'active': 'online',
  'inactive': 'offline'
}

const displayOnus = async (options, { pon_type: type = 'gpon', board = '1', slot = '1', port = '1'}) => {
  const cmd = `show interface ${type} onu`
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

	const elements = dummy2json(splitted.join('\n'), columns, 1)
  const data = elements.filter((item) => item['itf_--------'] === `${board}/${slot}/${port}`)

  let cmd2 = '';
  for (const interface of data) {
    cmd2 += `show interface ${type} ${interface['itf_--------']} onu ${interface['onuid_------']} | nomore
    `;
  }
  if (cmd2 == '') return []

  const chunkOnu = await conn.execDatacom(cmd2)
  const splitted2 = chunkOnu.split('\r\n')
  splitted2.shift()

  const joined = splitted2.join('\n')
  const onuGroup = joined.split(' | nomore')
    .map((item) => { 
      const newItem = item.split('\n')
      newItem.pop()
      newItem.pop()

      return column2json(newItem
        .filter((item2) => item2 !== '')
        .map((item3) => 
          item3
            .replace(':', '[$%]')
            .replace(/\:/gi, '-')
            .replace('[$%]', ':')
          )
      )
    })

	return onuGroup.map((item) => ({
    board,
    slot,
    port,
    ont_id: item['id'],
    serial_number: item.serial_number,
    pon_type: type,
    uptime_at: hour2time(item.uptime || ''),
    onu_type: item.equipment_i_d,
    name: item.name,
    catv_rx_power: 0,
    stage: STATUS[item.primarystatus.toLowerCase()] || 'disabled',
    temperature: 0,
    tx_power: parseFloat((item['tx_optical_power[d_bm]'] || '0').toLowerCase().replace('dbm', '').trim().replace(/ /gi, ''), 10) || '',
    rx_power: parseFloat((item['rx_optical_power[d_bm]'] || '0').toLowerCase().replace('dbm', '').trim().replace(/ /gi, ''), 10) || '',
    distance: parseInt((item['distance'] || '0').replace(' [km]', ''), 10),   
    mac_adress: item.mac || '',
    onu_external_id: item.external_id || '',
    authorization_at: new Date(),
    line_profile: item.line_profile,
    onu_profile: item.service_profile,
    custom_fields: {
      ...item,
      source: 'import_onu',
    }
	}))
}

module.exports = displayOnus
