const { dummy2json } = require('../../../../utils/lib')
const  displayPon = require('./displayPon')
const chance = require('chance').Chance()

const displayPons = async (options, { type = 'gpon', board = '1', slot = '1' }) => {
  const chunk = `
ZXAN#show card
Shelf Slot CfgType CardName     Port HardVer Status
---------------------------------------------------
1     1    ${chance.geohash({ length: 4 })}    ${chance.geohash({ length: 4 })}         16   V1.0.0  INSERVICE
1     2    ${chance.geohash({ length: 4 })}    ${chance.geohash({ length: 4 })}         16   V1.0.0  INSERVICE
1     3    ${chance.geohash({ length: 4 })}    ${chance.geohash({ length: 4 })}         16   V1.0.0  INSERVICE
1     5    ${chance.geohash({ length: 4 })}    ${chance.geohash({ length: 4 })}         4    V1.0.0  INSERVICE
1     6    ${chance.geohash({ length: 4 })}                 4            OFFLINE
1     10   ${chance.geohash({ length: 4 })}    ${chance.geohash({ length: 4 })}         0    V1.0.0  INSERVICE
1     13   ${chance.geohash({ length: 4 })}   ${chance.geohash({ length: 4 })}        0    V1.0.0  INSERVICE
IRARA-OLT#`
  const splitted = chunk.split('\n')
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

  const [theSlot] = slots || []
  const data = []  
  const portSize = (theSlot && theSlot.port) || 0
  for await (const [index] of Array.from({ length: portSize }).entries()) {
    const port = (index + 1)
    const pon_status = displayPon(options, { type, board, slot, port })
    data.push({
      board, 
      slot,
      port: port.toString(),
      ...pon_status,
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