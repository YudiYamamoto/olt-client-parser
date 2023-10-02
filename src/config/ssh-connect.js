const SSH = require('./ssh')
const SSH2 = require('./ssh2')

const connect = async (defaultOptions) => {
  const { cipher = [
    'aes128-cbc',
    '3des-cbc',
    'blowfish-cbc'
  ] } = (defaultOptions && defaultOptions.algorithms) || {}
  const defaultOptionsWithAlgorithms = { 
    ...defaultOptions, 
    algorithms: {
      ...defaultOptions.algorithms,
      cipher
    }
  }

  const client = new SSH(defaultOptions)
  const client3 = new SSH2(defaultOptions)
  const client2 = new SSH2(defaultOptionsWithAlgorithms)

  const connection = client.getConnection()
  const options = client.getOptions()
  
  const exec = async (cmd) => {
    const chunks = await client.exec(cmd)
    return chunks
    const _chunks = chunks.split(/\n/)
    return _chunks
      .map(chunk => chunk
        .replace(` ( Press 'Q' to break ) ----\x1B[37D                                     \x1B[37D`, '')
      )
      .join('\n')
  }

  const execCommand = async (cmd) => {
    const conn = null
    const chunks = await client.execCommand(conn, cmd)
    return chunks
  }

  const exec2 = async (cmd) => {
    const chunks = await client2.exec(cmd)
    return chunks    
  }

  const exec3 = async (cmd) => {
    const chunks = await client3.exec(cmd)
    return chunks    
  }

  const exec4 = async (cmd) => {
    const chunks = await client3.exec2(cmd)
    return chunks    
  }

  const exec5 = async (cmd) => {
    const chunks = await client2.exec2(cmd)
    return chunks    
  }

  const exec6 = async (cmd) => {
    const chunks = await client2.exec3(cmd)
    return chunks    
  }

  const execParks = async (cmd) => {
    const cmds = (cmd || '').split('\n')
    return await client2.execParks(cmds)
  }

  const exec7 = async (cmd) => {
    const cmds = (cmd || '').split('\n')
    const chunks = await client2.exec4(cmds)
    return chunks    
  }

  return {
    connection,
    options,
    exec,
    exec2,
    exec3,
    exec4,
    exec5,
    exec6,
    exec7,
    execParks,
  }
}

module.exports = { connect }