const { connect: telnetConnect } = require('../../config/telnet-connect')
const { connect: sshConnect } = require('../../config/ssh-connect')
module.exports = {
  telnetConnect,
  sshConnect
}