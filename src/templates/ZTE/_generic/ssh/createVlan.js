const { connect } = require('../../../../config/ssh-connect')

const createVlan = async (options, { vlan, description }) => {
  const conn = await connect(options)
  const cmd = `conf t
vlan ${vlan}
description ${description}`
  await conn.exec2(cmd)

  return cmd
}

module.exports = createVlan
