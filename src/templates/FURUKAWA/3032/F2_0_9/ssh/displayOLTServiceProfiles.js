const { connect } = require('../../../../../config/ssh-connect')

/*
OLT-SERRA-GRANDE-3008# show running-config gpon-olt 1 | include service-profile
  olt service-profile model-name 630-10B OP-ZTE-F601V7.0
  olt service-profile model-name 640-10B OP-ZTE-F601V7.0
  olt service-profile model-name F601V7.0 OP-ZTE-F601V7.0
OLT-SERRA-GRANDE-3008# 
*/

const regex = /olt service-profile model-name (\S+) (\S+)/;

const displayOLTServiceProfiles = async (originalOptions, { slot = '1', port = '1' }) => {
   const conn = await connect(originalOptions)
  const cmd = `enable
  show running-config interface gpon ${slot}/${port} | include service-profile`
  const chunk = await conn.exec3(cmd)

  const splitted = chunk.split('\r\n')
  splitted.pop()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  
  const data = []
  for (const match of splitted) {
    const [_, onu_type, onu_profile] = match.trim().match(regex) || [];
    
    data.push({
      onu_type,
      onu_profile,
    })
  }
  return data
}

module.exports = displayOLTServiceProfiles