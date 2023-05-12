const { connect } = require('../../../../config/ssh-connect')

const enableScopeLanToLan = async (options, vlan) => {
  const conn = await connect(options)
  const cmd = `conf t 
no security user-communication svlan ${vlan}`
  await conn.exec2(cmd)

  return cmd
}

module.exports = enableScopeLanToLan
