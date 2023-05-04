const { connect } = require('../../../../config/ssh-connect')

const deleteVlan = async (options, vlan) => {
  const conn = await connect(options)
  const cmd = `conf t
no vlan ${vlan}`
  await conn.exec2(cmd)

  return cmd
}

module.exports = deleteVlan
