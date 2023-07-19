const { connect } = require('../../../../config/ssh-connect')

/*
 dba-profile GERENCIA create
  mode sr
  sla fixed 256
  sla maximum 9984
  apply
 !
 dba-profile PLANOATE100M create
  mode sr
  sla fixed 1024
  sla assured 4096
  sla maximum 1031616
  apply
 !
 dba-profile PLANOATE50M create
  mode sr
  sla fixed 512
  sla assured 2048
  sla maximum 1031616
  apply
 !
*/

const displayDbaProfiles = async (originalOptions) => {
   const conn = await connect(originalOptions)
  const cmd = `enable
show running-config dba-profile`
  const chunk = await conn.exec(cmd)
  
  const splitted = chunk.split('\n')
  splitted.pop()
  splitted.shift()
  splitted.shift()
  splitted.shift()

  const joined = splitted.join('\n').replace(/\n/gi, '').trim().split('dba-profile')

  return joined.map(item => {
    const line = item.trim()
    if (!line) return
    const [_1, name] = line.match(/(.*) create/) || []
    const [_2, speed] = line.match(/sla maximum (\d*)/) || []
    const [_3, assured] = line.match(/sla assured (\d*) /) || []
    const [_4, fixed] = line.match(/sla fixed (\d*)/) || []
     
    return {
      name,
      type: '1',
      speed,
      assured,
      fixed
    }
  })
  .filter(item => !!item)
}

module.exports = displayDbaProfiles