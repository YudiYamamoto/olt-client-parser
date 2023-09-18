const { connect } = require('../../../../config/ssh-connect')
const { dummy2json } = require('../../../../utils/lib')
//const displayOLTServiceProfiles = require('../../../MADE4OLT/_generic/ssh/displayOLTServiceProfiles')

/*
-----------------------------------------------------------------------------
  Profile-ID  Profile-name                                Binding times
  -----------------------------------------------------------------------------
  0           srv-profile_default_0                       0
  1           Clientes                                    1
  -----------------------------------------------------------------------------
*/

const displayOLTServiceProfiles = async (originalOptions) => {
  const conn = await connect(originalOptions)
  const cmd = `enable 
  display ont-srvprofile gpon all`
  const chunk = await conn.exec7(cmd)
  if (!chunk && chunk === '') return null

  const splitted = chunk.split('\r\n')

  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.pop()
  splitted.pop()
  splitted.pop()

  const columns = [
    [0, 14],
    [14, 39],
    [39, 72],
  ]
  
  const data = dummy2json(splitted.join('\n'), columns, 2)

  return data.map((item) => ({ 
    onu_type: item['profile-_i_d'],
    onu_profile: item['profile-name'],
    custom_fields: {
      ...item,
    }
  }))
}

module.exports = displayOLTServiceProfiles