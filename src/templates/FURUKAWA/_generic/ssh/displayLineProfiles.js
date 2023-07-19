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

const displayLineProfiles = async (originalOptions) => {
   const conn = await connect(originalOptions)
  const cmd = `enable
show traffic-profile`
  const chunk = await conn.exec(cmd)

  
  const splitted = chunk.split('\n')
  splitted.pop()
  splitted.pop()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  
  const text = splitted.join('').trim()
  const regex_line_profile = /## Traffic Profile Description\((.*?)\)([\s\S]*?)(?=\n\n|## Traffic Profile Description|$)/g
  const regex_t_cont = /T-CONT index (\d+) is (\w+)/g;
  const regex_gem = /GEM port attached\s+:\s+(.*)/g
  const regex_dba_profile = /DBA profile name\s+:\s+(.*)/g
  const matchesData = [...text.matchAll(regex_line_profile)]

  let matches;
  const data = []
  for (const match of matchesData) {
    const [_x, name, tcont_text] = match

    const tconts = []
    while ((matches = regex_t_cont.exec(tcont_text))) {
      const [_x, name, is_configured] = matches
      const gems = []
      while ((matches = regex_gem.exec(tcont_text.trim()))) {
        const [_1, gem] = matches
        gems.push({ 
          name: gem.split(' ')[0],
          type: '1', 
        })
      }

      let dba_profile = null
      while ((matches = regex_dba_profile.exec(tcont_text))) {
        dba_profile = matches[1].split(' ')[0];
      }

      tconts.push({
        name,
        dba_profile,
        gems,
        custom_fields: {
          is_configured: is_configured === 'configured',
        }
      })
    }
    
    data.push({
      name,
      tconts,
    })
  }
  return data
}

module.exports = displayLineProfiles