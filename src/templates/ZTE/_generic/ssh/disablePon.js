const { connect } = require('../../../../config/ssh-connect')

const disablePon = async (options, { type, board, slot, port }) => {
  const conn = await connect(options)
  const cmd = `conf t
interface ${type}_olt-${board}/${slot}/${port}
 shutdown`
  await conn.exec2(cmd)

  return cmd
}

module.exports = disablePon
