const { connect } = require('../../../../config/ssh-connect')

/*
 onu-profile OP-EX-F612-SERRAGRANDE create
  traffic-profile OP-EX-F612-SERRAGRANDE
  apply
 !
 onu-profile OP-SERRA-GRANDE-PTP create
  traffic-profile TP-SERRA-GRANDE-PTP
  apply
 !
 onu-profile OP-ZTE-F601V7.0 create
  traffic-profile TP-ZTE-F601V7.0
  apply
 !
 onu-profile QUARENTENA create
  apply
 !
*/

const regex = /onu-profile (\S+) create[\s\S]*?traffic-profile (\S+)[\s\S]*?apply/g;

const displayOnuProfiles = async (originalOptions) => {
   const conn = await connect(originalOptions)
  const cmd = `enable
  show running-config onu-profile`
  const chunk = await conn.exec3(cmd)

  const splitted = chunk.split('\r\n')
  splitted.pop()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  
  const data = Array
    .from(splitted.join('\n')
    .matchAll(regex), ([_x, name, line_profile]) => ({ name, line_profile }))

  return data
}

module.exports = displayOnuProfiles