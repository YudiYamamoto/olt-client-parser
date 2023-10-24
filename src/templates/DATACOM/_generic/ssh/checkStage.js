const { connect } = require('../../../../config/ssh-connect')

/*
177.128.199.14: show system clock
2000-02-18 16:09:27 UTC-3 Brasil
OLT_Teste#
*/

const checkStage = async (options) => {  
  const cmd = `show system clock`
  const conn = await connect(options)
  const chunkDa = await conn.execDatacom(cmd)
  if (!chunkDa && chunkDa === '') return null
  
  const chunkIt = chunkDa.split('\r\n')
  chunkIt.shift();
  chunkIt.pop();

  return chunkIt.join('\n')
}

module.exports = checkStage