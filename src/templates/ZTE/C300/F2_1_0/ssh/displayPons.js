const { connect } = require('../../../../../config/ssh-connect')
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
const displayPons = async (options, { board = '1', slot = '1' }) => {
  const conn = await connect(options)
  const cmd = 'show card'
  const chunk = await conn.exec2(cmd)
  const splitted = chunk.split('\r\n')
  splitted.pop()
  splitted.pop()
  splitted.shift()
  splitted.shift()

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
  const elements = dummy2json(splitted.join('\n'), columns, 1)

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
  if (!theSlot) return data

  for await (const [index] of Array.from({ length: parseInt(theSlot.port, 10) }).entries()) {
    const port = (index + 1)
    const cmd1 = `show interface gpon-olt_${board}/${slot}/${port}`    
    const chunk1 = await conn.exec2(cmd1)
    let status = ''
    if (chunk1 && chunk1 !== '') {
      const splitted1 = chunk1.split('\r\n')
      splitted1.shift()
      splitted1.shift()
      status = splitted1[0]
    }
    const cmd2 = `show interface optical-module-info gpon-olt_${board}/${slot}/${port}`
    const chunk2 = await conn.exec2(cmd2)
    let min_range = '0'    
    if (chunk2 && chunk2 !== '') {
      const lines = chunk2.split('\r\n')
      lines.shift()
      lines.shift()
      lines.shift()
      const column = line2json(lines)
      min_range = (column['trans-_distance'] || '').replace('(km)', '').trim()
    }
    const max_range = String(min_range || '0')

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

module.exports = displayPons