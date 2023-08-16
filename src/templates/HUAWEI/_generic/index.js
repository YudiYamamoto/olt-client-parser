const sshCheckStage = require('./ssh/checkStage')
const sshDisplayBoards = require('./ssh/displayBoards')
const sshDisplaySlots = require('./ssh/displaySlots')

const telnetEnableRoot = require('./telnet/enableRoot')
const telnetDisplayPermissionByUser = require('./telnet/displayPermissionByUser')
const telnetDisplayBoard = require('./telnet/displayBoard')
const telnetDisplayPon = require('./telnet/displayPon')

module.exports = {
  ssh: {
    checkStage: sshCheckStage,
    displayBoards: sshDisplayBoards,
    displaySlots: sshDisplaySlots,
  },
  telnet: {
    enableRoot: telnetEnableRoot,
    displayPermissionByUser: telnetDisplayPermissionByUser,
    displayBoard: telnetDisplayBoard,
    displayPon: telnetDisplayPon,
  }
}