const { connect } = require('../../../../config/ssh-connect')

// TODO: verificar modificacao na assinatura da funcao entre huawei e zte
const enableUplink = async (options, { interface, board, slot, port }) => {
  const conn = await connect(options)
  const cmd = `config
  interface ${interface} ${board}/${slot}/${port}
  no shutdown
  top
  commit
  exit`
  await conn.execDatacom(cmd)

  return cmd
}

module.exports = enableUplink
