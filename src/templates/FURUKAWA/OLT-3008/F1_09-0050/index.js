const displayBoards = require('./ssh/displayBoards')
const displaySlots = require('./ssh/displaySlots')
const displayPons = require('./ssh/displayPons')
const displayOnus = require('./ssh/displayOnus')

module.exports = {
  ssh: {
    displayBoards,
    displaySlots,
    displayPons,
    displayOnus,
  }
}