const { connect } = require('../../../../config/ssh-connect')

const checkStage = async (options) => {
  
  const cmd = `display time`
  const conn = await connect(options)
  const chunkDa = await conn.exec7(cmd)
  if (!chunkDa && chunkDa === '') return null
  
  const chunkIt = chunkDa.split('\r\n')
  chunkIt.shift()
  chunkIt.shift()
  chunkIt.shift()
  chunkIt.shift()
  chunkIt.pop()
  chunkIt.pop()

  const chunk = chunkIt.join('\n')
  return chunk
}

module.exports = checkStage