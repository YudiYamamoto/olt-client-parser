const { connect } = require('../../../../config/ssh-connect')

// TODO: verificar modificacao na assinatura da funcao entre huawei e zte
const disableUplink = async (options, { interface, board, slot, port }) => {
  const conn = await connect(options)
  const cmd = `config
  interface ${interface} ${board}/${slot}/${port}
  shutdown
  commit
  top
  exit`
  const a = await conn.execDatacom(cmd)
  console.log(a);
  return;

  return cmd
}

module.exports = disableUplink
