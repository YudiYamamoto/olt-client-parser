const SSH2Shell = require ('ssh2shell')

class SSHWrapper {
  constructor({ host, port, username = 'root', password = 'guest', timeout = 2500, ...restOptions }) {
    if (!host || !port) throw new Error(JSON.stringify({ code: '0001', error: true, message: 'without_params' }))

    this._options = {
      ...restOptions,
      host,
      port, 
      userName: username,
      password, 
      tryKeyboard: true,
      keepaliveInterval: 60000,
      keepaliveCountMax: 1,
      // timeout, 
      authHandler: ['password'],
      algorithms: {
        cipher: [
          'aes128-cbc',
          '3des-cbc',
          'blowfish-cbc'
        ],
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
    // this._connection = connection
  }

  getOptions() {
    return this._options
  }

  getConnection() {
    return this._connection
  }

  async exec(cmd) {
    // const connection = this.getConnection()
    const options = this.getOptions()
    
    const connection = new SSH2Shell({
      server: options,
      // debug: true,
      commands: ['terminal length 512', cmd ],
      // enter: "--More-- \n",
    })
    return new Promise((resolve) => connection.connect(resolve))
  }
}

module.exports = SSHWrapper