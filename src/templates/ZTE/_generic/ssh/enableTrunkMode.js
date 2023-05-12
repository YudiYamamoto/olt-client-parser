const { connect } = require('../../../../config/ssh-connect')

const enableTrunkMode = async (options, {interface }) => {
  const conn = await connect(options)
  const cmd = `conf t
interface ${interface}
 switchport mode trunk`
  await conn.exec2(cmd)

  return cmd
}

module.exports = enableTrunkMode
