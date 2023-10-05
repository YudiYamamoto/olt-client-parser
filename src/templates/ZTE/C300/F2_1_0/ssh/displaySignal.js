const { connect } = require('../../../../../config/ssh-connect')
const { generateCommmand, runCommand } = require('../common/signal')

const displaySignal = async (options, { 
  pon_type: type = 'gpon', 
  board = '1', 
  slot = '1', 
  port = '1',
  ont_id = '1' 
}) => {
  const f_p_s = `${board}/${slot}/${port}` 
  const conn = await connect(options)
  const cmd = generateCommmand(type, f_p_s, ont_id)
  const chunckSignal = await conn.exec2(cmd)
  return runCommand(chunckSignal)       
}

module.exports = { 
  generateCommmand,
  runCommand,
  displaySignal, 
}