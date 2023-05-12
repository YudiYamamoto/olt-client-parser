const { connect } = require('../../../../config/ssh-connect')

const disableScopeInternet = async (options, vlan) => {
  const conn = await connect(options)
  const cmd = `conf t 
no ip dhcp snooping vlan ${vlan}`
  await conn.exec2(cmd)

  return cmd
}

module.exports = disableScopeInternet
