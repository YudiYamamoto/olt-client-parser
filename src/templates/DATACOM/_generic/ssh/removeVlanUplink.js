const { connect } = require('../../../../config/ssh-connect')

const removeVlanUplink = async (_options, { interface, board, slot, port, vlan }) => {
  const conn = await connect(_options)
  const cmd = `config
  no dot1q vlan ${vlan} interface ${interface}-${board}/${slot}/${port}
  top
  commit
  exit`
  await conn.execDatacom(cmd)

  return cmd
}

module.exports = removeVlanUplink
