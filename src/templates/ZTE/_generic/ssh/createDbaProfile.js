const { connect } = require('../../../../config/ssh-connect')

const createDbaProfile = async (options, { name, type, speed }) => {
  const conn = await connect(options)
  const cmd = `profile tcont ${name} type ${type} maximum ${speed}`
  await conn.exec2(cmd)
  return cmd
}

module.exports = createDbaProfile
