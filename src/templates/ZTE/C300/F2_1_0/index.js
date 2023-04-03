const displayBoards = require('./telnet/displayBoards')
const displaySlots = require('./telnet/displaySlots')
const displayPons = require('./telnet/displayPons')
const displayOnus = require('./telnet/displayOnus')

module.exports = {
  telnet: {
    displayBoards,
    displaySlots,
    displayPons,
    displayOnus,
  }
}