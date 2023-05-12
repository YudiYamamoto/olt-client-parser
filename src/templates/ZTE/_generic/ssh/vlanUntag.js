const { connect } = require('../../../../config/ssh-connect')

const vlanUntag = async (options, { vlan, interface }) => {
  const conn = await connect(options)
  const cmd = `conf t 
interface ${interface}
switchport vlan ${vlan} untag`
  await conn.exec2(cmd)

  return cmd
}

module.exports = vlanUntag
