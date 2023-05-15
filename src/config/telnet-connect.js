const Telnet = require('./telnet')

const connect = async (defaultOptions) => {
  const client = new Telnet(defaultOptions)
  const connection = client.getConnection()
  const options = client.getOptions()
  
  const exec = async (cmd) => {
    // const commands = cmds.split('\n')
    // for(commands)
    const chunks = await client.exec(cmd)
    const _chunks = chunks.split(/\n/)
    return _chunks
      .map(chunk => chunk
        .replace(` ( Press 'Q' to break ) ----\x1B[37D                                     \x1B[37D`, '')
      )
      .join('\n')
  }

  const send = async (cmd) => {
    // const commands = cmds.split('\n')
    // for(commands)
    const chunks = await client.send(cmd)
    const _chunks = chunks.split(/\n/)
    return _chunks
      .map(chunk => chunk
        .replace(` ( Press 'Q' to break ) ----\x1B[37D                                     \x1B[37D`, '')
      )
      .join('\n')
  }

  const send22 = async (cmd) => {
    const chunks = await client.send(cmd)
    return ''
  }

  return {
    connection,
    options,
    exec,
    send
  }
}

const connectCommand = async (connection, command, options, time, data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => { 
      connection.exec(command, options, (err, response) => {
        if (!err) reject(err)
        data.push(response)
      })
    resolve(data)
   }, time)
  })
}

module.exports = { connect, connectCommand }