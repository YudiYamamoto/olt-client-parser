const Telnet = require('./telnet')

const connect = async (options) => {
  const exec = async (cmd) => {
    const client = new Telnet(options)
    return client.exec(cmd)
  }

  return {
    exec
  }
}

module.exports = { connect }