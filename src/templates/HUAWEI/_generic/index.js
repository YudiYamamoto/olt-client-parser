const sshCheckStage = require('./ssh/checkStage')
const sshDisplayBoards = require('./ssh/displayBoards')
const sshDisplaySlots = require('./ssh/displaySlots')
const sshDisplayPons = require('./ssh/displayPons')
const sshDisplayOnus = require('./ssh/displayOnus')
const sshDisplayUplinks = require('./ssh/displayUplinks')
const sshDisplayOLTServiceProfiles = require('./ssh/displayOLTServiceProfiles')
const sshShowOpticalModuleInfo = require('./ssh/showOpticalModuleInfo')
const sshDisplayDbaProfiles = require ('./ssh/displayDbaProfiles')
const sshDisplayLineProfiles = require ('./ssh/displayLineProfiles')
const sshDisplayVlans = require ('./ssh/displayVlans')
const sshDisplayVlan = require ('./ssh/displayVlan')

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
    displayOLTServiceProfiles: sshDisplayOLTServiceProfiles,
    showOpticalModuleInfo: sshShowOpticalModuleInfo,
    displayDbaProfiles: sshDisplayDbaProfiles,
    displayLineProfiles: sshDisplayLineProfiles,
    displayVlans: sshDisplayVlans,
    displayVlan: sshDisplayVlan,
  },
  telnet: {
    enableRoot: telnetEnableRoot,
    displayPermissionByUser: telnetDisplayPermissionByUser,
    displayBoard: telnetDisplayBoard,
    displayPon: telnetDisplayPons,
  }
}