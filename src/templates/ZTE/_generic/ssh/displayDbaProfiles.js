const { connect } = require('../../../../config/ssh-connect')

/*
177.128.98.246: terminal length 512
IRARA-OLT#show running-config | include profile tcont
  profile tcont SMARTOLT-1G-UP type 4 maximum 1024000
  profile tcont SMARTOLT-MGMT-UP type 5 fixed 64 assured 64 maximum 512
  profile tcont MGMT type 4 maximum 512
*/

const displayDbaProfiles = async (originalOptions) => {
   const conn = await connect(originalOptions)
  const cmd = 'show running-config | include profile tcont'
  const chunk = await conn.exec2(cmd)
  
  const splitted = chunk.split('\r\n')
  splitted.pop()
  splitted.shift()
  splitted.shift()

  return splitted.map(item => {
    const line = item.trim()
    if (!line) return
    const [_1, name, type] = line.match(/profile tcont (.*) type (\d*)/) || []
    const [_2, speed] = line.match(/maximum (\d*)/) || []
    const [_3, assured] = line.match(/assured (\d*) /) || []
    const [_4, fixed] = line.match(/fixed (\d*)/) || []
    
    return {
      name,
      type,
      speed,
      assured,
      fixed
    }
  })
}

module.exports = displayDbaProfiles