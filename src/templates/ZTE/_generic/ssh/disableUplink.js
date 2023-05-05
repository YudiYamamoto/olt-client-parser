const { connect } = require('../../../../config/ssh-connect')

const disableUplink = async (options, interface) => {
  const conn = await connect(options)
  const cmd = `conf t
interface ${interface}
 shutdown`
  await conn.exec2(cmd)

  return cmd
}

module.exports = disableUplink
