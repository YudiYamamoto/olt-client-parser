const { connect } = require('../../../../../config/telnet-connect')
const { dummy2json } = require('../../../../../utils/lib')
const PromiseSeries = require('promise-series')

/*
>>> Mostra placas do chassi:
OlT_CHASSI_0_DC_HOMENET#display board 0
  -------------------------------------------------------------------------
  SlotID  BoardName  Status          SubType0 SubType1    Online/Offline
  -------------------------------------------------------------------------
  0       H807GPBH   Normal
  1       H805GPFD   Normal
  2       H801MCUD1  Active_normal   CPCB
  3
  4       H801MPWE   Normal
  5       H801MPWE   Normal
  -------------------------------------------------------------------------

*/
const sleep = ms => new Promise(r => setTimeout(r, ms))

const rrr = async (connection, command, options, time, data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => { 
      connection.exec(command, options, (err, response) => {
        if (!err) reject(err)
        // console.log(response, time, '<<<<')
        data.push(response)
      })
    resolve(data)
   }, time)
  })
}

const get = async (connection, command, options, data) => {
  return new Promise((resolve, reject) => {
    connection.exec(command, options, (err, response) => {
      // if (!err) reject(err)
      // console.log(response, time, '<<<<')
      data.push(response)
      // console.log(response, '<<<')
      resolve(data)
    })
  })
}

const displayBoard = async (originalOptions, board) => {
  const conn = await connect(originalOptions)
  const { options, connection } = conn

  const columns = [
    [0, 10],
    [10, 21],
    [21, 37],
    [37, 46],
    [46, 58],
    [58, 75],
  ]
  
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
  display board ${board}
  enable
  sysname ZAMPI
  `
    const chunks = await new Promise((resolve, reject) => {
      connection.on('ready', (prompt) => {
        const series = new PromiseSeries()
        const order = commands.split('\n')
        for (const [index, command] of order.entries()) {
          series.add(() => rrr(connection, command, options, 100 * index, data))
          // series.add(() => get(connection, command, options, data))
          // series.add(item => addOne(item))
          // series.add(() => sleep(200 * index))
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

    return dummy2json(chunk, columns, 2)
  /*
  return new Promise((resolve, reject) => {
    connection.on('ready', (prompt) => {
      connection.exec('sysname ZAMPIZAMPI\n', { ...options, shellPrompt: '#' }, ({ err, response }) => {
        console.log(response, '<<<')
        resolve(response)
      })
    })
  })
  */
}

module.exports = displayBoard