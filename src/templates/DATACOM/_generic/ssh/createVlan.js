const { connect } = require('../../../../config/ssh-connect')

const createVlan = async (options, { vlan, description }) => {
  const conn = await connect(options)
  const cmd = `config
  dot1q vlan ${vlan} name ${description}
  commit
  top
  exit`
  await conn.execDatacom(cmd)

  return cmd
}

module.exports = createVlan

