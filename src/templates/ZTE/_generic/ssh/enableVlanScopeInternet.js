const { connect } = require('../../../../config/ssh-connect')

const enableScopeInternet = async (options, vlan) => {
  const conn = await connect(options)
  const cmd = `conf t 
ip dhcp snooping enable 
ip dhcp snooping vlan ${vlan}`
  await conn.exec2(cmd)

  return cmd
}

module.exports = enableScopeInternet
