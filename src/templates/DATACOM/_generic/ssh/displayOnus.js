const { connect } = require('../../../../config/ssh-connect')
const { dummy2json } = require('../../../../utils/lib')

//STANDBY 
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

  const STATUS = {
    'online': 'online',
    'los': 'los',
    'dying-gasp': 'pwr_fail',
    'offline': 'disabled'
  }

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

	return data.map((item) => ({
		board: item['itf_--------'].split('/')[0],
		slot: item['itf_--------'].split('/')[1],
		port: item['itf_--------'].split('/')[2],
		ont_id: item['onuid_------'],
		serial_number: item['serial_number_-------------'],
    pon_type,
    uptime_at: hour2time(item.uptime || ''), // TODO
		onu_type: item.onu || '', // TODO
		operational_state: item['oper_state_----------'],
		name: item['name_----------------------'],
    catv_rx_power: 0,
    // stage: STATUS 
    // temperature: parseFloat((item['temperature_(_c)'] || '0').toLowerCase().replace('c', '').trim().replace(/ /gi, ''), 10),
    // tx_power: parseFloat((item['txpower_(d_bm)'] || '0').toLowerCase().replace('dbm', '').trim().replace(/ /gi, ''), 10),
    // rx_power: parseFloat((item['rxpower_(d_bm)'] || '0').toLowerCase().replace('dbm', '').trim().replace(/ /gi, ''), 10),
    // olt_rx_power: parseFloat((item['o_l_t_rx_o_n_t_power(d_bm)'] || '0').toLowerCase().replace('dbm', '').trim().replace(/ /gi, ''), 10),
    // distance: parseInt(item['distance_(m)'] || '0', 10),  
		mac_adress: item.mac || '', // TODO
		onu_external_id: item.external_id || '',
		authorization_at: new Date(),
	}))
}

module.exports = displayOnus