const { connect } = require('../../../../config/ssh-connect')

const checkStage = async (options) => {
  const cmd = `show clock`

  const conn = await connect(options)
  const chunkDa = await conn.execParks(cmd)
  if (!chunkDa && chunkDa === '') return null

  const chunkIt = chunkDa.split('\r\n')
  chunkIt.shift()
  chunkIt.shift()
  chunkIt.pop()

  return chunkIt.join('\n')
}

module.exports = checkStage