const { connect } = require('../../../../../config/telnet-connect')
const { dummy2json, line2json } = require('../../../../../utils/lib')

/*
Rack Shelf Slot CfgType RealType Port  HardVer SoftVer         Status
-------------------------------------------------------------------------------
 1    1     0    PRWH    PRWH     0     V1.0.0                  INSERVICE
 1    1     1    PRWH    PRWH     0     V1.0.0                  INSERVICE
 1    1     9    GTGH    GTGHG    16    V1.0.0  V2.1.0          INSERVICE
 1    1     10   SCXN    SCXN     4     V1.0.0  V2.1.0          INSERVICE
 1    1     11   SCXN    SCXN     4     V1.0.0  V2.1.0          STANDBY
 1    1     12   GTGH    GTGHG    16    V1.0.0  V2.1.0          INSERVICE
 1    1     13   GTGH    GTGHG    16    V1.0.0  V2.1.0          INSERVICE
 1    1     14   GTGH    GTGHG    16    V1.0.0  V2.1.0          INSERVICE
 1    1     15   GTGH    GTGHK    16    V1.0.0  V2.1.0          INSERVICE
 1    1     16   GTGH    GTGHK    16    V1.0.0  V2.1.0          INSERVICE
 1    1     17   GTGH    GTGHK    16    V1.0.0  V2.1.0          INSERVICE
 1    1     19   HUVQ    HUVQ     4     V1.0.0  V2.1.0          INSERVICE
 1    1     20   HUVQ    HUVQ     4     V1.0.0  V2.1.0          INSERVICE
 
*/
const displaySlots = async (options, { board = '1', slot = '1' }) => {
  const conn = await connect(options)
  // const cmd = 'show card'
  // const chunk = await conn.exec(cmd)

  const chunk = `
Rack Shelf Slot CfgType RealType Port  HardVer SoftVer         Status
-------------------------------------------------------------------------------
1    1     0    PRWH    PRWH     0     V1.0.0                  INSERVICE
1    1     1    PRWH    PRWH     0     V1.0.0                  INSERVICE
1    1     9    GTGH    GTGHG    16    V1.0.0  V2.1.0          INSERVICE
1    1     10   SCXN    SCXN     4     V1.0.0  V2.1.0          INSERVICE
1    1     11   SCXN    SCXN     4     V1.0.0  V2.1.0          STANDBY
1    1     12   GTGH    GTGHG    16    V1.0.0  V2.1.0          INSERVICE
1    1     13   GTGH    GTGHG    16    V1.0.0  V2.1.0          INSERVICE
1    1     14   GTGH    GTGHG    16    V1.0.0  V2.1.0          INSERVICE
1    1     15   GTGH    GTGHK    16    V1.0.0  V2.1.0          INSERVICE
1    1     16   GTGH    GTGHK    16    V1.0.0  V2.1.0          INSERVICE
1    1     17   GTGH    GTGHK    16    V1.0.0  V2.1.0          INSERVICE
1    1     19   HUVQ    HUVQ     4     V1.0.0  V2.1.0          INSERVICE
1    1     20   HUVQ    HUVQ     4     V1.0.0  V2.1.0          INSERVICE
   `

  const columns = [
    [0, 5],
    [5, 10],
    [10, 16],
    [16, 23],
    [23, 32],
    [32, 38],
    [38, 46],
    [46, 54],
    [54, 76],
  ]
  const elements = dummy2json(chunk, columns, 1)
  const boards = {}
  elements.forEach(item => {
    const key = `B${item.shelf}`
    if (!boards[key]) boards[key] = []
    boards[key].push(item)
  })
  const slots = boards[`B${board}`].filter(item => item.slot === slot && item.status === 'INSERVICE')
  if (!slots) return null

  const [theSlot] = slots
  const data = []  
  for await (const [index] of Array.from({ length: theSlot.port }).entries()) {
    const port = (index + 1)
    const cmd1 = `show interface gpon-olt_${board}/${slot}/${port}`
    const chunk1 = await conn.exec(cmd1)
    const [status] = chunk1.split('\n')

    const cmd2 = `show interface optical-module-info gpon-olt_${board}/${slot}/${port}`
    const chunk2 = await conn.exec(cmd2)

  const lines = chunk2.split('\n')
    const column = line2json(lines)
    const min_range = column['trans-_distance'].replace('(km)', '').trim()
    const max_range = min_range

    data.push({
      board, 
      slot,
      port: port.toString(),
      admin_status: (status || '').indexOf('deactivate') > -1 ? false : true,
      operational_status: (status || '').indexOf(' up.') > -1 ? 'up' : 'down',
      description: '',
      min_range: 0,
      max_range: parseInt(max_range, 10) * 1000,
      scope: [],
      default_for_pon_ports: [],
    })
  }
    
  return data
}

module.exports = displaySlots