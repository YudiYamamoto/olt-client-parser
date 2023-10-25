const { connect } = require('../../../../config/ssh-connect')
const { dummy2json } = require('../../../../utils/lib')

/*
        display frame info 
-------------------------------------------------------------------------
Frame   Frame      Frame      Online    Extend    Extending     Extended
ID      Type       State      State     Type      Port          Port
-------------------------------------------------------------------------
0       H801MABH   Normal     Online    -         - /- /-       - /- /-  
-------------------------------------------------------------------------
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
    [0, 9],
    [9, 20],
  ]
  
  const data = dummy2json(splitted.join('\n'), columns, 2)
  return data.map((item) => ({ board: item.frame_i_d }))
}


module.exports = displayBoards