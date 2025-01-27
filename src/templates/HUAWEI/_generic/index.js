const sshCheckStage = require('./ssh/checkStage')
const sshDisplayBoards = require('./ssh/displayBoards')
const sshDisplaySlots = require('./ssh/displaySlots')
const sshDisplayPons = require('./ssh/displayPons')
const sshDisplayPon = require('./ssh/displayPon')
const sshDisplayOnus = require('./ssh/displayOnus')
const sshDisplayOnu = require('./ssh/displayOnu')
const sshDisplayUplinks = require('./ssh/displayUplinks')
const sshDisplayOLTServiceProfiles = require('./ssh/displayOLTServiceProfiles')
const sshShowOpticalModuleInfo = require('./ssh/showOpticalModuleInfo')
const sshDisplayDbaProfiles = require ('./ssh/displayDbaProfiles')
const sshDisplayLineProfiles = require ('./ssh/displayLineProfiles')
const sshDisplayVlans = require ('./ssh/displayVlans')
const sshDisplayVlan = require ('./ssh/displayVlan')
const sshScopeVlanInternet = require('./ssh/scopeVlanInternet')
const sshScopeVlanLanToLan = require('./ssh/scopeVlanLanToLan')
const sshdisplayUnconfiguredOnus = require ('./ssh/displayUnconfiguredOnus')

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
    displayPon: sshDisplayPon,
    displayOnus: sshDisplayOnus,
    displayOnu: sshDisplayOnu,
    displayUplinks: sshDisplayUplinks,
    displayOLTServiceProfiles: sshDisplayOLTServiceProfiles,
    showOpticalModuleInfo: sshShowOpticalModuleInfo,
    displayDbaProfiles: sshDisplayDbaProfiles,
    displayLineProfiles: sshDisplayLineProfiles,
    displayVlans: sshDisplayVlans,
    displayVlan: sshDisplayVlan,
    scopeVlanInternet: sshScopeVlanInternet,
    scopeVlanLanToLan: sshScopeVlanLanToLan,
    displayUnconfiguredOnus: sshdisplayUnconfiguredOnus,
  },
  telnet: {
    enableRoot: telnetEnableRoot,
    displayPermissionByUser: telnetDisplayPermissionByUser,
    displayBoard: telnetDisplayBoard,
    displayPon: telnetDisplayPons,
  }
}