const { dummy2json } = require('../../../../utils/lib')
const chance = require('chance').Chance()

const displayPons = async (_options, { board = '1', slot = '1' }) => {
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

  const [theSlot] = slots
  const data = []  
  for await (const [index] of Array.from({ length: theSlot.port }).entries()) {
    const port = (index + 1)
    const chunk1 = `177.128.98.246: terminal length 512
IRARA-OLT#show interface gpon_olt-${board}/${slot}/${port}
  gpon_olt-${board}/${slot}/${port} is deactivate,line protocol is down.
  The port link up/down notification is trap enable.
Current channel num : 1 GPON
OLT statistic:
    Input rate :                  0 Bps                0 pps
    Output rate:                  0 Bps                0 pps
    Input Instantaneous bandwidth utilization : 0.0%    
    Output Instantaneous bandwidth utilization: 0.0%    
    Input Average bandwidth utilization : 0.0%    
    Output Average bandwidth utilization: 0.0%    
    Output Multicast Instantaneous rate:             N/A Bps                0 pps
Interface peak rate:
    Input peak rate :                  0 Bps                0 pps
    Output peak rate:                  0 Bps                0 pps
Total statistic:
  Input :
    Packets       :0                    DropPackets   :0                   
    PassBytes     :0                    UnicastsPkts  :0                   
    MulticastsPkts:0                    BroadcastsPkts:0                   
    CRCAlignErrors:0                    OversizePkts  :0                   
    UndersizePkts :0                    CollisionPkts : N/A                
    Fragments     : N/A                 Jabbers       : N/A                
    64B       :0                        65-127B   :0                   
    128-255B  :0                        256-511B  :0                   
    512-1023B :0                        1024-1518B:0                   
  Output :
    Packets       :0                    DropPackets   : N/A                
    PassBytes     :0                    UnicastsPkts  :0                   
    MulticastsPkts:0                    BroadcastsPkts:0                   
    64B       :0                        65-127B   :0                   
    128-255B  :0                        256-511B  :0                   
    512-1023B :0                        1024-1518B:0                   
IRARA-OLT#`
    let status = ''
    if (chunk1 && chunk1 !== '') {
      const splitted1 = chunk1.split('\n')
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