const { connect } = require('../../../../../config/ssh-connect')
const { generateCommmand, runCommand } = require('../common/mac')

const displayMac = async (options, { 
  pon_type: type = 'gpon', 
  board = '1', 
  slot = '1', 
  port = '1',
  ont_id = '1' 
}) => {
  const conn = await connect(options)
  const f_p_s = `${board}/${slot}/${port}`
  const cmd2 = generateCommmand(type, f_p_s, ont_id)
  const chunkMA = await conn.exec2(cmd2)
  return runCommand(chunkMA)
}

module.exports = {
  generateCommmand,
  runCommand,
  displayMac,
}