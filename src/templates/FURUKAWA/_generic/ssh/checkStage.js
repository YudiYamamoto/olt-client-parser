const { connect } = require('../../../../config/ssh-connect')

const checkStage = async (options) => {
  const conn = await connect(options)

  const cmd = `show clock`
  const chunkDa = await conn.exec3(cmd)
  if (!chunkDa && chunkDa === '') return null
  
  const chunkIt = chunkDa.split('\r\n')
  chunkIt.shift()
  chunkIt.shift()
  chunkIt.pop()
  
  const chunk = chunkIt.join('\n')
  return chunk
}

module.exports = checkStage