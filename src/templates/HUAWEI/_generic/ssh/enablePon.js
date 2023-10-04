const { connect } = require('../../../../config/ssh-connect')

const enablePon = async (options, { type, board, slot, port }) => {
  const conn = await connect(options)
  const cmd = `enable
config
interface ${type} ${board}/${slot}
port ${port} ont-auto-find enable
undo shutdown ${port}
quit
quit
quit`
  await conn.exec2(cmd)

  return cmd
}

module.exports = enablePon
