const { connect } = require('../../../../config/ssh-connect')
const { dummy2json } = require('../../../../utils/lib')

const scopeVlanInternet = async (options) => {
  const conn = await connect(options)
  const cmd = `enable
  show dhcp-server-filter`  
  const chunk = ''; // await conn.exec(cmd) // TODO verificar
  
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
module.exports = scopeVlanInternet