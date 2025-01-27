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

const displayPons = async (options, { board = '1', slot = '1' }) => {
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
  const slots = (boards && boards[`B${board}`] || [])
    .filter(item => item.slot === slot && item.status === 'INSERVICE')
  if (!slots) return null

  const [theSlot] = slots
  const data = []  
  if (!theSlot) return data
  
  for await (const [index] of Array.from({ length: theSlot.port }).entries()) {
    const port = (index + 1)
    const cmd1 = `show interface gpon_olt-${board}/${slot}/${port}`
    const chunk1 = await conn.exec2(cmd1)
    let status = ''
    if (chunk1 && chunk1 !== '') {
      const splitted1 = chunk1.split('\r\n')
      splitted1.shift()
      splitted1.shift()
      status = splitted1[0]
    }
    
    data.push({
      board, 
      slot,
      port: port.toString(),
      admin_status: (status || '').indexOf('deactivate') > -1 ? false : true,
      operational_status: (status || '').indexOf(' up.') > -1 ? 'up' : 'down',
      description: '',
      min_range: 0,
      max_range: 20 * 1000,
      scope: [],
      default_for_pon_ports: [],
    })
  }
    
  return data
}

module.exports = displayPons