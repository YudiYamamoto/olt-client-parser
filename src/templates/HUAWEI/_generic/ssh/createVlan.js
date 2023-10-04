const { connect } = require('../../../../config/ssh-connect')

const createVlan = async (options, { vlan, description }) => {
  const conn = await connect(options)
  const cmd = `enable
config
vlan ${vlan} smart
y
quit
quit`
  await conn.exec2(cmd)

  return cmd
}

module.exports = createVlan
