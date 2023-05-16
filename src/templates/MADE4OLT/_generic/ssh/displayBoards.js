const { dummy2json } = require('../../../../utils/lib')
const chance = require('chance').Chance()

const displayBoards = async (_originalOptions) => {
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
  ]

  const elements = dummy2json(splitted.join('\n'), columns, 1)

  const boards = {}
  elements.forEach(item => {
    const key = `B${item.shelf}`
    if (!boards[key]) boards[key] = 0
  })
  const items = Object.keys(boards)
  return items.map(item => ({ board: item.replace(/B/gi, '') }))
}

module.exports = displayBoards