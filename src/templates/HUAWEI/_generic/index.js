const sshCheckStage = require('./ssh/checkStage')
const sshDisplayBoards = require('./ssh/displayBoards')
const sshDisplaySlots = require('./ssh/displaySlots')
const sshDisplayPons = require('./ssh/displayPons')
const sshDisplayOnus = require('./ssh/displayOnus')
const sshDisplayUplinks = require('./ssh/displayUplinks')
const sshdisplayOLTServiceProfiles = require('./ssh/displayOLTServiceProfiles')
const sshshowOpticalModuleInfo = require('./ssh/showOpticalModuleInfo')

const telnetEnableRoot = require('./telnet/enableRoot')
const telnetDisplayPermissionByUser = require('./telnet/displayPermissionByUser')
const telnetDisplayBoard = require('./telnet/displayBoard')
const telnetDisplayPons = require('./telnet/displayPon')

module.exports = {
  ssh: {
    checkStage: sshCheckStage,
    displayBoards: sshDisplayBoards,
    displaySlots: sshDisplaySlots,
    displayPons: sshDisplayPons,
    displayOnus: sshDisplayOnus,
    displayUplinks: sshDisplayUplinks,
    displayOLTServiceProfiles: sshdisplayOLTServiceProfiles,
    showOpticalModuleInfo: sshshowOpticalModuleInfo,
  },
  telnet: {
    enableRoot: telnetEnableRoot,
    displayPermissionByUser: telnetDisplayPermissionByUser,
    displayBoard: telnetDisplayBoard,
    displayPon: telnetDisplayPons,
  }
}