const displayBoards = require('./ssh/displayBoards')
const displaySlots = require('./ssh/displaySlots')
const displayPons = require('./ssh/displayPons')
const displayOnus = require('./ssh/displayOnus')

const generic = require('../../_generic')

module.exports = {
  ssh: {
    displayBoards,
    displaySlots,
    displayPons,
    displayOnus,
    ...generic.ssh,
  }
}