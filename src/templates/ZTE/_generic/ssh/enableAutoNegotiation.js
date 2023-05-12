const { connect } = require('../../../../config/ssh-connect')

const disableAutoNegotiation = async (options, {interface }) => {
  const conn = await connect(options)
  const cmd = `conf t
interface ${interface}
 negotiation negotiation-force`
  await conn.exec2(cmd)

  return cmd
}

module.exports = disableAutoNegotiation
