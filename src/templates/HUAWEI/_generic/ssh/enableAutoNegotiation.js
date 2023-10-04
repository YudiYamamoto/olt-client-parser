const { connect } = require('../../../../config/ssh-connect')

// TODO: verificar modificacao na assinatura da funcao entre huawei e zte
const disableAutoNegotiation = async (options, { board, slot, port, type }) => {
  const conn = await connect(options)
  const cmd = `enable
config
interface ${type} ${board}/${slot}
auto-neg ${port} enable
quit
quit
quit`
  await conn.exec2(cmd)

  return cmd
}

module.exports = disableAutoNegotiation
