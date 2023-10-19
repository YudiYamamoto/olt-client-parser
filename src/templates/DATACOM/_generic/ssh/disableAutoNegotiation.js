const { connect } = require('../../../../config/ssh-connect')

// TODO: verificar modificacao na assinatura da funcao entre huawei e zte
const disableAutoNegotiation = async (options, { interface, board, slot, port }) => {
  const conn = await connect(options)
  const cmd = `config
  interface ${interface} ${board}/${slot}/${port}
  no negotiation
  mdix normal
  top
  commit
  exit`
  await conn.execDatacom(cmd)

  return cmd
}

module.exports = disableAutoNegotiation
