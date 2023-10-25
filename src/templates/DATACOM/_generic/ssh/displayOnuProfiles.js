const { connect } = require('../../../../config/ssh-connect')
const { dummy2json } = require('../../../../utils/lib')

/*
                            ETH              POTS   VEIP
NAME              ADAPTIVE  VALUE  ADAPTIVE  VALUE  VALUE
-----------------------------------------------------------
ONU-GENERICA      X         -      X         -      1
ONU_BRIDGE_TESTE  -         1      -         -      -
ONU_ROUTER_TESTE  X         -      -         -      1
*/


//TODO Verificar
const displayOnuProfiles = async (options) => {
  const cmd = 'show running-config profile gpon onu-profile | nomore | tab'
  const conn = await connect(options)
  const chunk = await conn.execDatacom(cmd)
  if (!chunk && chunk === '') return null
  
  const splitted = chunk.split('\r\n')
  splitted.shift()
  splitted.pop()
  splitted.pop()

  console.log(splitted)

  const columns = [
    [0, 18],
    [18, 26],
    [26, 34],
    [35, 45],
    [45, 52],
    [52, 59],
  ]
  
  const data = dummy2json(splitted.join('\n'), columns, 2)

  return data
    .map((item) =>  {      
      return {
        name: item.name,
        custom_fields: {
          ...item
        }
      }
    })
}

module.exports = displayOnuProfiles