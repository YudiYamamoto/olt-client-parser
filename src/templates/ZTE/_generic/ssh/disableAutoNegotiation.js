const { connect } = require('../../../../config/ssh-connect')

const enableAutoNegotiation = async (options, {interface }) => {
  const conn = await connect(options)
  const cmd = `conf t
interface ${interface}
 negotiation negotiation-auto`
  await conn.exec2(cmd)

  return cmd
}

module.exports = enableAutoNegotiation
