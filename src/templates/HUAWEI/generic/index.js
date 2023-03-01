const enableRoot = require('./telnet/enableRoot')
const displayPermissionByUser = require('./telnet/displayPermissionByUser')
const displayBoard = require('./telnet/displayBoard')
const displayPon = require('./telnet/displayPon')

module.exports = {
  telnet: {
    enableRoot,
    displayPermissionByUser,
    displayBoard,
    displayPon,
  }
}