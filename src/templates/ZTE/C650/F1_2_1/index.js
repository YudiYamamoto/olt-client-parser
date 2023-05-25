const displayBoards = require('./telnet/displayBoards')
const displaySlots = require('./telnet/displaySlots')
const displayPons = require('./telnet/displayPons')
const displayPon = require('./telnet/displayPon')
const displayOnus = require('./telnet/displayOnus')

const sshDisplayBoards = require('./ssh/displayBoards')
const sshDisplaySlots = require('./ssh/displaySlots')
const sshDisplayPons = require('./ssh/displayPons')
const sshDisplayPon = require('./ssh/displayPon')
const sshDisplayOnus = require('./ssh/displayOnus')
const sshDisplayOnu = require('./ssh/displayOnu')

const generic = require('../../_generic')

module.exports = {
  telnet: {
    displayBoards,
    displaySlots,
    displayPons,
    displayPon,
    displayOnus,
  },
  ssh: {
    displayBoards: sshDisplayBoards,
    displaySlots: sshDisplaySlots,
    displayPons: sshDisplayPons,
    displayPon: sshDisplayPon,
    displayOnus: sshDisplayOnus,
    displayOnu: sshDisplayOnu,
    ...generic.ssh,
  }
}