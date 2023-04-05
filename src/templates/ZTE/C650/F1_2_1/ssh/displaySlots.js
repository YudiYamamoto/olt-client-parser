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

const displaySlots = async (options, { board = '1' }) => {
  const conn = await connect(options)
  const cmd = 'show card'
  const chunk = await conn.exec2(cmd)
  const splitted = chunk.split('\r\n')
  splitted.pop()
  splitted.shift()
  splitted.shift()

  const columns = [
    [0, 6],
    [6, 10],
    [10, 18],
    [18, 28],
    [28, 36],
    [36, 44],
    [44, 56],
  ]
  const elements = dummy2json(splitted.join('\n'), columns, 1)
  
  const boards = {}
  elements.forEach(item => {
    const key = `B${item.shelf}`
    if (!boards[key]) boards[key] = []
    boards[key].push(item)
  })
  const items = boards[`B${board}`]
  return items.map(({ slot, cfg_type: type, card_name: real_type, hard_ver: software_version, status }) => ({ 
    board,
    slot,
    type,
    real_type,
    software_version,
    available: status === 'INSERVICE',
    role: 'main',
  }))
}

module.exports = displaySlots