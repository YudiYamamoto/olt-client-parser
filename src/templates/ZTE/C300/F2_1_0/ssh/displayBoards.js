const { connect } = require('../../../../../config/ssh-connect')
const { dummy2json } = require('../../../../../utils/lib')

/*
ZXAN#show card
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
ZXAN#
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
    [0, 5],
    [4, 10],
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