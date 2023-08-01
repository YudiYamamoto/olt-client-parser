const { connect } = require('../../../../../config/ssh-connect')
const { commandOpticalModuleInfo, generateOpticalModuleInfo } = require('./execOpticalModuleInfo')

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
  const cmd = commandOpticalModuleInfo(type, slot, port, ont_id)
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

  return generateOpticalModuleInfo(lines)
}

module.exports = showOpticalModuleInfo