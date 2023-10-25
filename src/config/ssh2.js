const SSH2Shell = require ('ssh2shell')

const TIMEOUT = 90000

class SSHWrapper {
  constructor({ 
    host,
    port,
    username = 'root',
    password = 'guest',
    algorithms,
    timeout = TIMEOUT,      // Limita o tamanho da conexão
    keepaliveCountMax = 4,  // Numero de conexões concorrentes
    keepaliveInterval = 0,  // Valida a conexão com intervalo de tanto tempo entre conexões concorrentes
    ...restOptions 
  }) {
    if (!host || !port) throw new Error(JSON.stringify({ code: '0001', error: true, message: 'without_params_ssh2' }))

    if (typeof restOptions.minimal !== 'undefined' && restOptions.minimal === true) {
      this._options = {
        host,
        port, 
        userName: username,
        password, 
        ...restOptions,
      }
    } else {
      this._options = {
        ...restOptions,
        host,
        port, 
        userName: username,
        password, 
        tryKeyboard: true,
        timeout, 
        keepaliveInterval,
        keepaliveCountMax,
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
        /*tryKeyboard: true,
        onKeyboardInteractive(name, instructions, instructionsLang, prompts, finish) {
          if (prompts.length > 0 && prompts[0].prompt.toLowerCase().includes('password')) {
            finish([password])
          }
        },*/
        // "debug": console.log
      }    
    }

    // this._connection = connection
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
    // const connection = this.getConnection()
    const options = this.getOptions()
    const connection = new SSH2Shell({
      server: options,
      // debug: true,
      commands: ['terminal length 0', cmd, 'exit' ],
      // enter: "\n",
    })
  
    /*
    connection.on('commandProcessing', function onCommandProcessing( command, response, sshObj, stream ) {
      if (command.indexOf('show onu detail-info') > -1 && response.indexOf("--More--") > -1) {
        stream.write(sshObj.enter)
      }
    })
    */
    return new Promise((resolve) => connection.connect(resolve))
  }

  async exec3(cmds) {
    // const connection = this.getConnection()
    const options = this.getOptions()
    const connection = new SSH2Shell({
      server: options,
      // debug: true,
      commands: ['terminal length 0', ...cmds, 'exit' ],
      // enter: "\n",
    })
    return new Promise((resolve) => connection.connect(resolve))
  }

  async exec4(cmds) {
    // const connection = this.getConnection()
    const options = this.getOptions()
    const connection = new SSH2Shell({
      server: options,
      // debug: true,
      commands: ['undo smart', ...cmds],
      // enter: "\n",
    })
    return new Promise((resolve) => connection.connect(resolve))
  }

  async execParks(cmds) {
    const connection = new SSH2Shell({
      server: this.getOptions(),
      commands: ['terminal length 0', ...cmds, 'exit'],
      msg: message => !message.includes(['Connected', 'Ready', 'Closed'])
    })

    return new Promise((resolve) => connection.connect(resolve))
  }

  async execDatacom(cmds) {
    const options = this.getOptions()
    const server = { ...options, algorithms: null }
    const connection = new SSH2Shell({
      server,
      commands: [...cmds],
    })
    return new Promise((resolve) => connection.connect(resolve))
  }

  async exec2(cmd, isTerminal=true) {
    const commands = [isTerminal ? 'terminal length 0' : null, cmd, 'exit']

    const options = this.getOptions()
    const connection = new SSH2Shell({
      server: { ...options, timeout: 30000 },
      // debug: true,
      commands: commands.filter(item => !!item),
      // enter: "\n",
    })
    
    // const test = await connection.execCommand('xeyes', { x11: true })
    // console.error(test)
    await connection.connect()
    
    return new Promise((resolve) => {
      const conn = connection
      // let test = null
      const chunks = []
      conn.on('pipe', function onPipe(stream){
        let chunk;            
        while (null !== (chunk = stream.read())) {
          const item = Buffer.from(chunk).toString('utf-8')
          // console.log('got %d bytes of data', chunk.length)
          // console.log(item)
          // chunks.push(item.replace('--More-- \r         \r', ''))
          chunks.push(item)
          // console.log(stream)
        }
      })
      conn.on('end', function (stream) {
        const item = chunks.join('').split('\r\n').slice(6, -3)
        // if (stream) stream.close()
        resolve(item.join('\n'))
      })
    })
  }
}

module.exports = SSHWrapper