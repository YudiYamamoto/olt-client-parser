const { connect } = require('../../../../../config/ssh-connect')
const { dummy2json } = require('../../../../../utils/lib')

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
const displaySlots = async (options, { board = '1' }) => {
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
  const items = boards[`B${board}`] || []
  return items.map(({ 
    slot, 
    cfg_type: type, 
    real_type, 
    soft_ver: software_version, 
    status, 
    ...custom_fields
  }) => ({ 
    board,
    slot,
    type,
    real_type,
    software_version,
    available: status === 'INSERVICE',
    role: 'main',
    custom_fields,
  }))
}

module.exports = displaySlots