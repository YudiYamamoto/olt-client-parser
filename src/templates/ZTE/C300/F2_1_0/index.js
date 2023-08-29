const displayBoards = require('./telnet/displayBoards')
const displaySlots = require('./telnet/displaySlots')
const displayPons = require('./telnet/displayPons')
const displayOnus = require('./telnet/displayOnus')

const sshDisplayBoards = require('./ssh/displayBoards')
const sshDisplaySlots = require('./ssh/displaySlots')
const sshDisplayPons = require('./ssh/displayPons')
const sshDisplayPon = require('./ssh/displayPon')
const sshDisplayOnus = require('./ssh/displayOnus')
const sshDisplayOnu = require('./ssh/displayOnu')
const { displayMac: sshDisplayMac } = require('./ssh/displayMac')
const { displaySignal: sshDisplaySignal } = require('./ssh/displaySignal')

const generic = require('../../_generic/')


module.exports = {
  telnet: {
    displayBoards,
    displaySlots,
    displayPons,
    displayOnus,
  },
  ssh: {
    ...generic.ssh,
    displayBoards: sshDisplayBoards,
    displaySlots: sshDisplaySlots,
    displayPons: sshDisplayPons,
    displayPon: sshDisplayPon,
    displayOnus: sshDisplayOnus,
    displayOnu: sshDisplayOnu,
    displayMac: sshDisplayMac,
    displaySignal: sshDisplaySignal,
  }
}