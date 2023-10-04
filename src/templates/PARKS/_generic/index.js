const sshCheckStage = require('./ssh/checkStage')
const sshDisplaySlots = require('./ssh/displaySlots')
const sshDisplayVlans = require('./ssh/displayVlans')
// actions
const sshCreateVlan = require('./ssh/createVlan')

module.exports = {
  ssh: {
    checkStage: sshCheckStage,
    displaySlots: sshDisplaySlots,
    displayVlans: sshDisplayVlans,
    // actions
    createVlan: sshCreateVlan,
  },
}
