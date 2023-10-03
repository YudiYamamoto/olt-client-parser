const { connect } = require('../../../../config/ssh-connect')
const { column2json } = require('../../../../utils/lib')
const { dummy2json } = require('../../../../utils/lib')

/*
'138.97.70.10: undo smart\r',
  '  Interactive function is disabled\r',
  '\r',
  'MA5608T>enable\r',
  '\r',
  'MA5608T#display ont-lineprofile gpon all\r',
  '  ------------------------------------------------------------------------------\r',
  '  Profile-ID  Profile-name                                Binding times\r',
  '  ------------------------------------------------------------------------------\r',
  '  0           line-profile_default_0                      0            \r',
  '  1           Line-Profile                                1            \r',
  '  2           line-profile_2                              0            \r',
  '  ------------------------------------------------------------------------------\r',
  '  Total: 3\r',
  '\r',
  'MA5608T#display ont-lineprofile gpon profile-id 2\r',
  '  ------------------------------------------------------------------------------\r',
  '  Profile-ID          :2\r',
  '  Profile-name        :line-profile_2\r',
  '  Access-type         :GPON\r',
  '  ------------------------------------------------------------------------------\r',
  '  FEC upstream switch :Disable \r',
  '  OMCC encrypt switch :Off\r',
  '  Qos mode            :PQ\r',
  '  Mapping mode        :VLAN\r',
  '  TR069 management    :Disable\r',
  '  TR069 IP index      :0\r',
  '  ------------------------------------------------------------------------------\r',
  '  <T-CONT   0>          DBA Profile-ID:1\r',
  '  ------------------------------------------------------------------------------\r',
  '  Binding times       :0\r',
  '  ------------------------------------------------------------------------------\r',
  '\r',
  'MA5608T#',
  ''
*/

const displayLineProfiles = async (originalOptions) => {
  const conn = await connect(originalOptions)
  const cmd = `enable
  display ont-lineprofile gpon all`
  const chunk = await conn.exec7(cmd)
  if (!chunk && chunk === '') return null

  const splitted1 = chunk.split('\n')

  console.log(splitted1)

  splitted1.shift()
  splitted1.shift()
  splitted1.shift()
  splitted1.shift()
  splitted1.shift()
  splitted1.shift()
  splitted1.pop()
  splitted1.pop()
  splitted1.pop()
  splitted1.pop()
  splitted1.pop()
  splitted1.pop()
  splitted1.pop()
  splitted1.pop()
  splitted1.pop()
  splitted1.pop()
  splitted1.pop()
  splitted1.pop()
  splitted1.pop()
  splitted1.pop()
  splitted1.pop()
  splitted1.pop()
  splitted1.pop()
  splitted1.pop()
  splitted1.pop()
  splitted1.pop()
  splitted1.pop()
  splitted1.pop()

const columns = [
  [0, 14],
]

const data = dummy2json(splitted1.join('\n'), columns, 2)

console.log(splitted1)

// return data.map (async(item) => {
// const cmd = `display ont-lineprofile gpon profile-id ${item}`
//   const chunk = await conn.exec7(cmd)
//   if (!chunk && chunk === '') return null

//   const splitted1 = chunk.split('\n')

//   console.log(splitted1)

// });



return data.map((item) => ({
    profileNumber: item['profile-_i_d'], 
    custom_fields: {
      ...item,
    }
}))

// const data = column2json(
//     splitted1
//     .map(item2 => 
//       item2
//         .replace(':', '[$%]')
//         .replace(/\:/gi, '-')
//         .replace('[$%]', ':')
//       )
//     .splice(1))
    
//   const data = {
//     name: item['profile-name'],
//     dba_profileID: item['<_t-_c_o_n_t0>_d_b_a_profile-_i_d'],
//     custom_fields: {
//       ...item
//     }
//   }

// return data

//   const data = dummy2json(splitted.join('\n'), columns, 2)

//   // TODO Felix Verificar T-CONT / GEM
//   return data.map((item) => ({
//     name: item['profile-_i_d'], 
//     custom_fields: {
//       ...item,
//     }
//   }))  
}

module.exports = displayLineProfiles