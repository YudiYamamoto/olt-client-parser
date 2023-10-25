const displayOnus = require('./ssh/displayOnus')
const displayOnu = require('./ssh/displayOnu')
const displayBoards = require('./ssh/displayBoards')

module.exports = {
  ssh: {
    displayBoards, 
    displayOnus,
    displayOnu,
  }
}