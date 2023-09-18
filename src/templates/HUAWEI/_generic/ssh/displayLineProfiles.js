const { connect } = require('../../../../config/ssh-connect')
const { dummy2json } = require('../../../../utils/lib')

/*
------------------------------------------------------------------------------
Profile-ID  Profile-name                                Binding times
------------------------------------------------------------------------------
0           line-profile_default_0                      0
1           Line-Profile                                1
2           line-profile_2                              0
------------------------------------------------------------------------------
*/

const displayLineProfiles = async (originalOptions) => {
  const conn = await connect(originalOptions)
  const cmd = `enable
  display ont-lineprofile gpon all`
  const chunk = await conn.exec7(cmd)
  if (!chunk && chunk === '') return null
  
  const splitted = chunk.split('\n')

  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.pop()
  splitted.pop()
  splitted.pop()
  splitted.pop()

  const columns = [
    [0, 12],
    [12, 45],
    [45, 65],
  ]

  const data = dummy2json(splitted.join('\n'), columns, 2)

  return data.map((item) => ({
    profile_id: item['profile-_i_d'], 
    profile_name: item['profile-name'],
    binding_times: item.binding
  }))
}

module.exports = displayLineProfiles