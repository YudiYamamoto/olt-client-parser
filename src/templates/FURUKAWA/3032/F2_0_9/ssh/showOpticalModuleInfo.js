const { connect } = require('../../../../../config/ssh-connect')
const { line2json } = require('../../../../../utils/lib')

/*
---------------------------------------------------------------
 OLT : 1, ONU : 24 GPON Module 
---------------------------------------------------------------

         DMI Temperature:  50.9300 C	(Alarm    0.0000 /    0.0000)
                 DMI Vcc:  3.2400 V	(Alarm    0.0000 /    0.0000)
             DMI TX bias:  15.6500 mA	(Alarm    0.0000 /    0.0000)
            DMI Tx power:  2.0600 dBm	(Alarm  -63.5000 /  -63.5000)
            DMI Rx power:  -16.1000 dBm	(Alarm       N/A /       N/A)
---------------------------------------------------------------             
*/

const showOpticalModuleInfo = async (options, { slot, port, pon_type: type = 'gpon', ont_id }) => {
  const conn = await connect(options)
  const cmd = `show onu ani optic-module-info ${type} ${slot}/${port} ${ont_id}`
  const chunk = await conn.exec2(cmd)
  const lines = chunk.split('\r\n')
  lines.pop()
  lines.pop()
  lines.shift()
  lines.shift()
  lines.shift()
  lines.shift()
  lines.shift()
  lines.shift()

  const column = line2json(lines, 100)

  const data = {}
  Object
    .keys(column)
    .forEach((item) => { 
      const [value] = column[item].split('(Alarm')
      return data[item] = parseFloat((value || '').toLowerCase().replace(/[ ,a-z]/gi, ''))
    })

  return {
    temperature: data['d_m_i_temperature'],
    tx_power: data['d_m_i_txpower'],
    olt_rx_power: data['d_m_i_rxpower'],
    custom_fields: data
  }
}

module.exports = showOpticalModuleInfo
