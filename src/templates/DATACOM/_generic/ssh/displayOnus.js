const { connect } = require('../../../../config/ssh-connect')
const { dummy2json } = require('../../../../utils/lib')

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
		onu_type: item.onu || '',
		operational_state: item['oper_state_----------'],
		name: item['name_----------------------'],
		mac_adress: item.mac || '',
		onu_external_id: item.external_id || '',
		authorization_at: new Date(),
	}))
}

module.exports = displayOnus