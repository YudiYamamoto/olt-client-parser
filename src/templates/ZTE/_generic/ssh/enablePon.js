const { connect } = require('../../../../config/ssh-connect')

const enablePon = async (options, { type, board, slot, port }) => {
  const conn = await connect(options)
  const cmd = `conf t
interface ${type}_olt-${board}/${slot}/${port}
no shutdown`
  await conn.exec2(cmd)

  return cmd
}

module.exports = enablePon
