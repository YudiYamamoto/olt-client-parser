const { NodeSSH } = require('node-ssh')

const TIMEOUT = 150000

class SSHWrapper {
  constructor({ 
    host, 
    port, 
    username = 'root', 
    password = 'guest', 
    algorithms,
    timeout = TIMEOUT,        // Limita o tamanho da conexão
    keepaliveCountMax = 4,  // Numero de conexões concorrentes
    keepaliveInterval = 0,  // Valida a conexão com intervalo de tanto tempo entre conexões concorrentes
    ...restOptions
   }) {
    if (!host || !port) throw new Error(JSON.stringify({ code: '0001', error: true, message: 'without_params_ssh' }))
    
    const connection = new NodeSSH()

    this._options = {
      ...restOptions,
      host,
      port, 
      username,
      password, 
      tryKeyboard: true,
      timeout, 
      keepaliveCountMax,
      keepaliveInterval,
      authHandler: ['password'],
      algorithms: {
        ...algorithms,
        kex: [
          'diffie-hellman-group1-sha1',
          'curve25519-sha256@libssh.org',
          'ecdh-sha2-nistp256',
          'ecdh-sha2-nistp384',
          'ecdh-sha2-nistp521',
          'diffie-hellman-group-exchange-sha256',
          'diffie-hellman-group14-sha1'
        ],
        // cipher?: AlgorithmList<CipherAlgorithm>,
        serverHostKey: ['ssh-dss','ssh-rsa'],
        // hmac?: AlgorithmList<MacAlgorithm>,
        // compress?: AlgorithmList<CompressionAlgorithm>,
      },
      /*
      onKeyboardInteractive(name, instructions, instructionsLang, prompts, finish) {
        if (prompts.length > 0 && prompts[0].prompt.toLowerCase().includes('password')) {
          finish([password])
        }
      },
      */
      // "debug": console.log
    }    

    this._connection = connection
    this._timeout = timeout > 0 ? timeout : TIMEOUT
  }

  getOptions() {
    return this._options
  }

  getConnection() {
    return this._connection
  }

  getTimeout() {
    return this._timeout || TIMEOUT
  }

  async exec(cmd) {
    const connection = this.getConnection()
    const options = this.getOptions()
    
    await connection.connect(options)
    
    // const test = await connection.execCommand('xeyes', { x11: true })
    // console.error(test)
    return new Promise((resolve) => {
      const conn = connection.connection
      // let test = null
      const chunks = []
      conn.shell((err, stream) => {
        // if (err) reject(err)
        if (err) resolve(null) // TODO 
        /*
        if (connection.keepAliveInterval) clearInterval(connection.keepAliveInterval);

        connection.keepAliveInterval = setInterval(() => {
          if (stream.writable) {
            stream.write('\b');
            console.log(`KeepAlive ping`);
          }
        }, 1500);
        */

        stream
          /*
          .on('data', (data) => {
            // console.log(Buffer.from(data).toString('utf-8'), '>>>')
            // resolve(Buffer.from(data).toString('utf-8'))
            test = Buffer.from(data).toString('utf-8')
          })          
          .on('error', (data) => {
            console.error(data, '<<<')
          })          
          */
          .on('readable', () => {
            let chunk;            
            while (null !== (chunk = stream.read())) {
              const item = Buffer.from(chunk).toString('utf-8')
              // console.log('got %d bytes of data', chunk.length)
              // console.log(item)
              // chunks.push(item.replace('--More-- \r         \r', ''))
              chunks.push(item)
              // console.log(stream)
            }
            // if (!chunk) stream.close()
          })
          .on('end', function () {
            const item = chunks.join('').split('\r\n').slice(6, -3)
            // chunks.shift()
            // chunks.pop()
            // console.table(item)
            stream.close()
            resolve(item.join('\n'))
          })
          .on('close', function () {
            connection.dispose()
          })
          .end(`terminal length 0\n ${cmd}\n exit\n`, 'utf8', () => {
            setTimeout(() => {
              stream.close()
            }, this.getTimeout())
          })
      })
    })
  }

  async execCommand(conn, cmd) {
    if (!conn || !cmd) return

    return new Promise((resolve) => {
      let chunks = []
      conn.shell((err, stream) => {
        if (err) resolve(null) 
        /*
        if (connection.keepAliveInterval) clearInterval(connection.keepAliveInterval);

        connection.keepAliveInterval = setInterval(() => {
          if (stream.writable) {
            stream.write('\b');
            console.log(`KeepAlive ping`);
          }
        }, 1500);
        */

        stream
          /*
          .on('data', (data) => {
            // console.log(Buffer.from(data).toString('utf-8'), '>>>')
            // resolve(Buffer.from(data).toString('utf-8'))
            test = Buffer.from(data).toString('utf-8')
          })          
          .on('error', (data) => {
            chunks = [];
          })          
          */
          .on('readable', () => {
            let chunk;            
            while (null !== (chunk = stream.read())) {
              const item = Buffer.from(chunk).toString('utf-8')
              // console.log('got %d bytes of data', chunk.length)
              // console.log(item)
              // chunks.push(item.replace('--More-- \r         \r', ''))
              chunks.push(item)
            }
          })
          .on('end', function () {
            const item = chunks.join('').split('\r\n').slice(6, -3)
            // chunks.shift()
            // chunks.pop()
            // console.table(item)
            stream.close()
            resolve(item.join('\n'))
          })
          .end(`terminal length 0\n ${cmd}\n exit\n`, 'utf8', () => {
            setTimeout(() => stream.close(), this.getTimeout())
            console.log('saida')
          })
      })
    })
  }
}

module.exports = SSHWrapper