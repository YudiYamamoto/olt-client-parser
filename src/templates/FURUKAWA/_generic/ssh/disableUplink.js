const { connect } = require('../../../../config/ssh-connect')

const disableUplink = async (options, interface) => {
  const conn = await connect(options)
  const cmd = `enable
  conf t
  bridge
  port disable ${interface}`  
  await conn.exec(cmd)
  return cmd
}

module.exports = disableUplink
