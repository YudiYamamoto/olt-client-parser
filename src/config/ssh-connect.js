const SSH = require('./ssh')
const SSH2 = require('./ssh2')

const connect = async (defaultOptions) => {
  const client = new SSH(defaultOptions)
  const client2 = new SSH2(defaultOptions)
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
  const exec2 = async (cmd) => {
    const chunks = await client2.exec(cmd)
    return chunks    
  }

  return {
    connection,
    options,
    exec,
    exec2
  }
}

module.exports = { connect }