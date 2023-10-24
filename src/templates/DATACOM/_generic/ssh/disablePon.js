const { connect } = require('../../../../config/ssh-connect')

const disablePon = async (options, { board, slot, port }) => {
  const conn = await connect(options)
  const cmd = `config
  interface gpon ${board}/${slot}/${port}
  shutdown
  top
  commit
  quit`
  await conn.execDatacom(cmd)

  return cmd
}

module.exports = disablePon
