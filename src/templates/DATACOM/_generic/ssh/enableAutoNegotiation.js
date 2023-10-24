const { connect } = require('../../../../config/ssh-connect')

// TODO: verificar modificacao na assinatura da funcao entre huawei e zte
const enableAutoNegotiation = async (options, { interface, board, slot, port }) => {
  const conn = await connect(options)
  const cmd = `config
  interface ${interface} ${board}/${slot}/${port}
  negotiation
  advertising-abilities 1Gfull 10Mfull 100Mfull
  mdix auto
  top
  commit
  exit`
  await conn.execDatacom(cmd)

  return cmd
}

module.exports = enableAutoNegotiation
