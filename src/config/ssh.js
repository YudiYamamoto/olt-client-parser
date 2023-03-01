const { NodeSSH } = require('node-ssh')

class SSHWrapper {
  constructor({ host, port, username = 'root', password = 'guest', timeout = 2500, ...restOptions }) {
    const connection = new NodeSSH()
    if (!host || !port) throw new Error(JSON.stringify({ code: '0001', error: true, message: 'without_params' }))

    this._options = {
      ...restOptions,
      host,
      port, 
      username,
      password, 
      tryKeyboard: true,
      keepaliveInterval: 60000,
      keepaliveCountMax: 1,
      // timeout, 
      authHandler: ['password'],
      algorithms: {
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
      /*tryKeyboard: true,
      onKeyboardInteractive(name, instructions, instructionsLang, prompts, finish) {
        if (prompts.length > 0 && prompts[0].prompt.toLowerCase().includes('password')) {
          finish([password])
        }
      },*/
      // "debug": console.log
    }    
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
    
    await connection.connect(options)
    
    // const test = await connection.execCommand('xeyes', { x11: true })
    // console.error(test)
    return new Promise((resolve, reject) => {
      const conn = connection.connection
      let test = null
      const chunks = []
      conn.shell((err, stream) => {
        if (err) reject(err)
        stream
          .on('end', function () {
            const item = chunks.join('').split('\r\n').slice(6, -3)
            // chunks.shift()
            // chunks.pop()
            // console.table(item)
            resolve(item.join('\n'))
          })
          .on('data', (data) => {
            // console.log(Buffer.from(data).toString('utf-8'), '>>>')
            // resolve(Buffer.from(data).toString('utf-8'))
            test = Buffer.from(data).toString('utf-8')
          })          
          .on('readable', () => {
            let chunk;            
            while (null !== (chunk = stream.read())) {
              // console.log('got %d bytes of data', chunk.length);
              chunks.push(Buffer.from(chunk).toString('utf-8'))
            }
          })
          .end(`${cmd}\n exit\n`)
      })
    })
  }
}

module.exports = SSHWrapper