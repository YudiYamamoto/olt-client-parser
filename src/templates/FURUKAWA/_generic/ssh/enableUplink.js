const { connect } = require('../../../../config/ssh-connect')

const enableUplink = async (options, interface) => {
  const conn = await connect(options)
  const cmd = `enable
  conf t
  bridge
  port enable ${interface}`  
  await conn.exec(cmd)
  return cmd
}

module.exports = enableUplink
