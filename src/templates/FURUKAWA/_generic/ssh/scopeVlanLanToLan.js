const { connect } = require('../../../../config/ssh-connect')
const { dummy2json } = require('../../../../utils/lib')

const scopeVlanLanToLan = async (options) => {
  const conn = await connect(options)
  const cmd = `enable
  show vlan cross-connect`  
  const chunk = await conn.exec(cmd)
  
  const splitted = chunk.split('\n')
  splitted.shift()
  splitted.shift()

  const columns = [
    [0, 16],
    [17, 21],
    [22, 26],
  ]

  return []
}
module.exports = scopeVlanLanToLan