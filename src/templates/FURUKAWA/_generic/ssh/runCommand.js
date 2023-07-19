const { connect } = require('../../../../config/ssh-connect')

const runCommand = async (options, cmd) => {
  const conn = await connect(options)
  const chunk = await conn.exec3(cmd)

  return chunk
}

module.exports = runCommand
