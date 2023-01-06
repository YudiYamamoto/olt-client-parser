const { Telnet } = require('telnet-client')

class TelnetWrapper {
  constructor({ host, port, username = 'root', password = 'guest', timeout = 2500, ...restOptions }) {
    const connection = new Telnet()
    if (!host || !port) throw new Error(JSON.stringify({ code: '0001', error: true, message: 'without_params' }))

    this._options = {
      ...restOptions,
      host,
      port, 
      username,
      password, 
      timeout, 
    }

    /*
    connection.on('data', async (chunk) => {
      if (!chunk) return
      const data = Buffer.from(chunk).toString('utf-8')
      console.debug('connection data', data)
    })
    */

    connection.on('failedlogin', () => connection.end())
    connection.on('timeout', () => connection.end())
    // connection.on('connect', () => console.info('connected!'))
    // connection.on('error', (error) => console.error('connection error', error.stack))
    // connection.on('close', () => console.info('connection closed'))
    connection.connect(this._options)

    this._connection = connection
  }

  getOptions() {
    return this._options
  }

  getConnection() {
    return this._connection
  }

  async exec(cmd) {
    const connection = this.getConnection()
    const options = this.getOptions()
    return new Promise((resolve, reject) => {
      connection.on('ready', (prompt) => {
        connection.exec(cmd, options, (err, response) => {
          if (!err) resolve(response)
          reject(err)
        })
      })
    })
  }
}

module.exports = TelnetWrapper