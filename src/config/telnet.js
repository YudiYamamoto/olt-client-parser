const { Telnet } = require('telnet-client')

class TelnetWrapper {
  constructor({ host, port, username = 'root', password = 'guest', timeout = 2500, ...restOptions }) {
    const connection = new Telnet()
    if (!host || !port) throw new Error(JSON.stringify({ code: '0001', error: true, message: 'without_params_telnet' }))

    this._options = {
      ...restOptions,
      host,
      port, 
      username,
      password, 
      timeout, 
    }

    /*
    connection.on('response', async (chunk) => {
      if (!chunk) return
      const data = Buffer.from(chunk).toString('utf-8')
      console.debug('connection data', data)
    })
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
    
    connection.connect(options)
    
    return new Promise((resolve, reject) => {
      connection.on('ready', (prompt) => {
        /*
        connection.send('enable', options, (err, response) => {
          console.error(err)
          console.log(response)
        })
        */
      /*
       connection.send('scroll 512\n', options, (err, response) => {
         // console.error(err)
         console.log(response, 'scroll')
         connection.on('data', async (chunk) => {
          if (!chunk) return
          const data = Buffer.from(chunk).toString('utf-8')
          // console.debug('connection send', data)
          // resolve(data)
        })
        })
        
        /*

        /*
        connection.send('undo smart', options, (err, response) => {
          console.error(err)
          console.log(response)
        })
        */

        /*
        connection.send('mmi mode', options, (err, response) => {
          console.error(err)
          console.log(response)
        })
        */
        

        try {
          const buff = Buffer.from(cmd, 'utf-8')
          // console.log(buff)
          connection.exec(cmd, options, (err, response) => {
            // resolve(response)

            connection.on('data', async (chunk) => {
              // if (!chunk) return
              // const data = Buffer.from(chunk).toString('utf-8')
              // console.debug('connection exec', data)
              resolve(chunk)
              // resolve(data)
            })
          })
        } catch (error) {
          console.log('errou')
        }
      })
    })
  }

  async send(cmds) {
    const connection = this.getConnection()
    const options = this.getOptions()
    
    connection.connect(options)
    
    const arrData = []
    
    return new Promise((resolve, reject) => {
      connection.on('ready', (prompt) => {
        
        /*
        connection.on('data', async (chunk) => {
          if (!chunk) return
          const data = Buffer.from(chunk).toString('utf-8')
          // console.log( chunk, data, 'response >>>>')
          //console.debug('connection data', data)
          // resolve(data)
          // arrData.push(data)
        })
        */

        // connection.on('close', () => console.log(response))

        const commands = cmds.split('\n')
        for (const [index, cmd] of commands.entries()) {
          const command = commands.length === (index + 1) ? 'exec' : 'send'
          const buff = Buffer.from(cmd, 'utf-8')
          connection[command](buff, options, (err, response) => {
            arrData.push(response)

            if (command === 'exec') resolve(response)
            /*
            console.log(err, 'sss', 'response', response)
            let line = null
            let count = 0
            while ((line = await connection.nextData())) {
              console.log(line, count++)
            }
            // if (!err) resolve(response)
            // reject(err)
            */
          })          
        }
      })
    })
  }

  async shell(cmds) {
    const connection = this.getConnection()
    const options = this.getOptions()
    
    connection.connect(options)
    
    return new Promise((resolve, reject) => {
      connection.on('ready', (prompt) => {

        /*
        connection.on('data', async (chunk) => {
          // console.log( chunk, 'response >>>>')
          if (!chunk) return
          const data = Buffer.from(chunk).toString('utf-8')
          console.debug('connection data', data)
        })
        */

        connection.shell(async (err, stream) => {
          let buffered = ''
          const cb = (chunk, index) => { 
            const data = Buffer.from(chunk).toString('utf-8')
            // console.log(data, index)
            buffered += data
          }
          stream.on('data', cb)
          for (const [index, iterator] of cmds.split('\n').entries()) {
            setTimeout(() => {
              stream.write(`${iterator}\n`)
              stream.removeListener('data', (item) => {
                console.log('temp', item)
              })
            }, 100)
          }
          setTimeout(() => {
            // resolve(buffered)
          }, 250)            
        })
      })
    })
  }
}

module.exports = TelnetWrapper