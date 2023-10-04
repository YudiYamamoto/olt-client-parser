const { connect } = require('../../../../config/ssh-connect')

// TODO: verificar modificacao na assinatura da funcao entre huawei e zte
const vlanUntag = async (options, { board, slot, port, vlan }) => {
  const conn = await connect(options)
  const cmd = `enable
config
undo port vlan ${vlan} ${board}/${slot} ${port}
quit
quit`
  await conn.exec2(cmd)

  return cmd
}

module.exports = vlanUntag
