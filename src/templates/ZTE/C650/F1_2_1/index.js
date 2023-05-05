const displayBoards = require('./telnet/displayBoards')
const displaySlots = require('./telnet/displaySlots')
const displayPons = require('./telnet/displayPons')
const displayOnus = require('./telnet/displayOnus')

const sshDisplayBoards = require('./ssh/displayBoards')
const sshDisplaySlots = require('./ssh/displaySlots')
const sshDisplayPons = require('./ssh/displayPons')
const sshDisplayOnus = require('./ssh/displayOnus')

const generic = require('../../_generic')

module.exports = {
  telnet: {
    displayBoards,
    displaySlots,
    displayPons,
    displayOnus,
  },
  ssh: {
    displayBoards: sshDisplayBoards,
    displaySlots: sshDisplaySlots,
    displayPons: sshDisplayPons,
    displayOnus: sshDisplayOnus,
    ...generic.ssh,
  }
}