const { connect } = require('../../../../config/ssh-connect')

const showOpticalModuleInfo = async (options, {interface }) => {
  const conn = await connect(options)
  const cmd = `show optical-module-info ${interface}`
  return await conn.exec2(cmd)

  // return cmd
}

module.exports = showOpticalModuleInfo
