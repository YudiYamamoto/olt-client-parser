const { connect, connectCommand } = require('../../../../../config/telnet-connect')
const { dummy2json } = require('../../../../../utils/lib')
const PromiseSeries = require('promise-series')

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
  const { options, connection } = conn
  /*
  // const chunk = await conn.exec(cmd)
  // const data = dummy2json(chunk, columns, 2)
  connection.connect(options)  
  const data = []
  
  connection.on('data', (chunk) => {
    const data = Buffer.from(chunk).toString('utf-8')
    // console.debug('connection data', data, connection.pendingData)
  })

  const commands = `scroll 512
  undo smart
  show card
  `
  const chunks = await new Promise((resolve, reject) => {
    connection.on('ready', (prompt) => {
      const series = new PromiseSeries()
      const order = commands.split('\n')
      for (const [index, command] of order.entries()) {
        series.add(() => connectCommand(connection, command, options, 100 * index, data))
      }

      series.run().then(xxx => resolve(xxx))
    })
  })
  const _chunks = chunks[2].split(/\n/)
  const chunk = _chunks
    .map(chunk => chunk
      .replace(` ( Press 'Q' to break ) ----\x1B[37D                                     \x1B[37D`, '')
    )
    .join('\n')
  */

  const chunk = `Rack Shelf Slot CfgType RealType Port  HardVer SoftVer         Status
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
    [4, 10],
  ]

  const elements = dummy2json(chunk, columns, 1)
  const boards = {}
  elements.forEach(item => {
    const key = `B${item.shelf}`
    if (!boards[key]) boards[key] = 0
  })
  const items = Object.keys(boards)
  return items.map(item => ({ board: item.replace(/B/gi, '') }))
}

module.exports = displayBoards