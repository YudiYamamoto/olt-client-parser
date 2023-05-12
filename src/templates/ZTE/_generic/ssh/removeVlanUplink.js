const { connect } = require('../../../../config/ssh-connect')

const removeVlanUplink = async (options, { vlan, interface }) => {
  const conn = await connect(options)
  const cmd = `conf t
interface ${interface}
no switchport vlan ${vlan}`
  await conn.exec2(cmd)

  return cmd
}

module.exports = removeVlanUplink
