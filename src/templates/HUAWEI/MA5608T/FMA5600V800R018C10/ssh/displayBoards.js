const { connect } = require('../../../../../config/ssh-connect')
const { dummy2json } = require('../../../../../utils/lib')

/*
        display frame info 
--------------------------------------------------
  FrameID       FrameType           FrameState
--------------------------------------------------
  0             H801MABR            Normal
--------------------------------------------------
*/

const displayBoards = async (options) => {  
  const cmd = `display frame info`
  const conn = await connect(options)
  const chunk = await conn.exec7(cmd)
  if (!chunk && chunk === '') return null
  
  const splitted = chunk.split('\r\n')
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.pop()
  splitted.pop()
  splitted.pop()
  splitted.pop()

  const columns = [
    [0, 16],
    [16, 36],
  ]
  
  const data = dummy2json(splitted.join('\n'), columns, 2)
  return data.map((item) => ({ board: item.frame_i_d }))
}

module.exports = displayBoards