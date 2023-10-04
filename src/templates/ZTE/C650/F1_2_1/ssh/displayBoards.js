const { connect } = require('../../../../../config/ssh-connect')
const { dummy2json } = require('../../../../../utils/lib')

/*
ZXAN#show card
Shelf Slot CfgType CardName     Port HardVer Status
---------------------------------------------------
1     1    GFGH    GFGH         16   V1.0.0  INSERVICE
1     2    GFGH    GFGH         16   V1.0.0  INSERVICE
1     3    GFGH    GFGH         16   V1.0.0  INSERVICE
1     5    SFUQ    SFUQ         4    V1.0.0  INSERVICE
1     6    SFUQ                 4            OFFLINE
1     10   PRVR    PRVR         0    V1.0.0  INSERVICE
1     13   FCRDC   FCRDC        0    V1.0.0  INSERVICE
IRARA-OLT#
*/

const displayBoards = async (originalOptions) => {
  const conn = await connect(originalOptions)
  const cmd = 'show card'
  const chunk = await conn.exec2(cmd)
  
  const splitted = chunk.split('\r\n')
  splitted.pop()
  splitted.shift()
  splitted.shift()

  const columns = [
    [0, 6],
  ]

  const elements = dummy2json(splitted.join('\n'), columns, 1)

  const boards = {}
  elements.forEach(item => {
    const key = `B${item.shelf}`
    if (!boards[key]) boards[key] = 0
  })
  const items = Object.keys(boards)
  return items
    .map(item => ({ board: item.replace(/B/gi, '') }))
    .filter(item => !!item.board)
}

module.exports = displayBoards