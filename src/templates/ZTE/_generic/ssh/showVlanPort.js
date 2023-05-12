const { connect } = require('../../../../config/ssh-connect')

const showVlanPort = async (options, {interface }) => {
  const conn = await connect(options)
  const cmd = `show vlan port ${interface}`
  return await conn.exec2(cmd)

  // return cmd
}

module.exports = showVlanPort
