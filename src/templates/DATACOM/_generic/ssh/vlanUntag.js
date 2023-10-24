const { connect } = require('../../../../config/ssh-connect')

const vlanUntag = async (options, { interface, board, slot, port, vlan }) => {
  const conn = await connect(options)
  const cmd = `config
    dot1q vlan ${vlan} interface ${interface}-${board}/${slot}/${port} untagged
    top
    switchport interface ${interface}-${board}/${slot}/${port} native-vlan vlan-id ${vlan}
    top
    commit
    exit`
  await conn.execDatacom(cmd)

  return cmd
}

module.exports = vlanUntag
