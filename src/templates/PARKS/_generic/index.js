const sshCheckStage = require('./ssh/checkStage')
const sshDisplaySlots = require('./ssh/displaySlots')

module.exports = {
  ssh: {
    checkStage: sshCheckStage,
    displaySlots: sshDisplaySlots,
  },
}
