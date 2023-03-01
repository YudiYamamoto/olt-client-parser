const SSH = require('./ssh')

const connect = async (defaultOptions) => {
  const client = new SSH(defaultOptions)
  const connection = client.getConnection()
  const options = client.getOptions()
  
  const exec = async (cmd) => {
    // const commands = cmds.split('\n')
    // for(commands)
    const chunks = await client.exec(cmd)
    // console.log(chunks)
    return chunks
    const _chunks = chunks.split(/\n/)
    return _chunks
      .map(chunk => chunk
        .replace(` ( Press 'Q' to break ) ----\x1B[37D                                     \x1B[37D`, '')
      )
      .join('\n')
  }

  return {
    connection,
    options,
    exec,
  }
}

module.exports = { connect }