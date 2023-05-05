const sshDisplayVlans = require('./ssh/displayVlans')
const sshDisplayVlan = require('./ssh/displayVlan')
const sshCreateVlan = require('./ssh/createVlan')
const sshDeleteVlan = require('./ssh/deleteVlan')

const sshDisplayUplinks = require('./ssh/displayUplinks')
const sshEnableUplink = require('./ssh/enableUplink')
const sshDisableUplink = require('./ssh/disableUplink')

module.exports = {
  ssh: {
    displayVlans: sshDisplayVlans,
    displayVlan: sshDisplayVlan,
    createVlan: sshCreateVlan,
    deleteVlan: sshDeleteVlan,
    displayUplinks: sshDisplayUplinks,
    enableUplink: sshEnableUplink,
    disableUplink: sshDisableUplink,
  }
}