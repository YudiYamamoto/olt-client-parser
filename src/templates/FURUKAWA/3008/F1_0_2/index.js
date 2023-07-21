const displayBoards = require('./ssh/displayBoards')
const displaySlots = require('./ssh/displaySlots')
const displayPons = require('./ssh/displayPons')
const displayPon = require('./ssh/displayPon')
const displayOnus = require('./ssh/displayOnus')
const displayOnu = require('./ssh/displayOnu')
const showOpticalModuleInfo = require('./ssh/showOpticalModuleInfo')

const generic = require('../../_generic')

module.exports = {
  ssh: {
    displayBoards,
    displaySlots,
    displayPons,
    displayPon,
    displayOnus,
    displayOnu,
    showOpticalModuleInfo,
    ...generic.ssh,
  }
}