const { connect } = require('../../../../config/ssh-connect')
const { dummy2json } = require('../../../../utils/lib')

/*
OLT_Teste# show platform | nomore
Chassis/Slot  Product model      Role     Status        Firmware version
------------  -----------------  -------  ------------  ----------------------
1             DM4615             -        -             Not available
1/1           16GPON+4GT+4XS     Active   Ready         6.6.0-005-1-g7f8f48526c
1/FAN         DM4610-FAN         None     Ready         Not available
1/PSU1        PSU-125-DC         None     Ready         Not available
1/PSU2        PSU-125-DC         None     Ready         Not available
*/

const displayBoards = async (options) => {  
  const cmd = 'show platform'
  const conn = await connect(options)
  const chunk = await conn.execDatacom(cmd)
  if (!chunk && chunk === '') return null

  const splitted = chunk.split('\r\n')
  splitted.shift()
  splitted.pop()
  splitted.pop()
  
  const columns = [
    [0, 14],
    [14, 32],
    [32, 42],
    [42, 56],
    [56, 85]
  ]
  
  const elements = dummy2json(splitted.join('\n'), columns, 1)

  const boards = {}
  elements.forEach(item => {
    const key = `${item['chassis_slot_------------'].split('/')[0]}`
    if (!boards[key]) boards[key] = 0
  })
  const items = Object.keys(boards)
  return items
    .map(item => ({ board: item }))
    .filter(item => !!item.board)
}

module.exports = displayBoards