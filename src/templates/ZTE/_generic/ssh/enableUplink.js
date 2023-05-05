const { connect } = require('../../../../config/ssh-connect')

const enableUplink = async (options, interface) => {
  const conn = await connect(options)
  const cmd = `conf t
interface ${interface}
no shutdown`
  await conn.exec2(cmd)

  return cmd
}

module.exports = enableUplink
