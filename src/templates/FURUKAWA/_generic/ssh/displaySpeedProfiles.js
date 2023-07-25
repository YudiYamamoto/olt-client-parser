// const { connect } = require('../../../../config/ssh-connect')

const displaySpeedProfiles = async (originalOptions) => {

  return []
  /*
  const conn = await connect(originalOptions)
  const cmd = 'show running-config | include traffic-profile'
  const chunk = await conn.exec2(cmd)
 
  const splitted = chunk.split('\n')
  splitted.pop()
  splitted.shift()
  splitted.shift()

  return splitted.map(item => {
    const line = item.trim()
    if (!line) return
    const [_1, name, speed] = line.match(/traffic-profile (.*) cir (\d*)/) || []
    // const [_2, cbs] = line.match(/cbs (\d*)/) || []
    const [_3, pir] = line.match(/pir (\d*) /) || []
    // const [_4, pbs] = line.match(/pbs (\d*)/) || []
    const matchName = name.toLowerCase()  
    
    return {
      name,
      type: /voip/gi.test(matchName) ? 'voip' : /iptv/gi.test(matchName) ? 'iptv' : 'internet',
      direction: /up/gi.test(matchName) ? 'upload' : 'download',
      speed,
      pir,
      assured: '0',
      maximum: '0'
    }
  })
  */
}

module.exports = displaySpeedProfiles