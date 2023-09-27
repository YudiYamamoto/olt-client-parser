const displayOnus = require('./ssh/displayOnus')
const displayBoards = require('../FMA5600V800R018C10/ssh/displayBoards')

module.exports = {
  ssh: {
    displayBoards,
    displayOnus
  }
}