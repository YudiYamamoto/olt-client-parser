const sshCheckStage = require('./ssh/checkStage')
const sshDisplayBoards = require('./ssh/displayBoards')
const sshDisplaySlots = require('./ssh/displaySlots')
const sshDisplayPons = require('./ssh/displayPons')
const sshDisplayPon = require('./ssh/displayPon')
const sshDisplayOnus = require('./ssh/displayOnus')
const sshDisplayOnu = require('./ssh/displayOnu')
// const sshDisplayUplinks = require('./ssh/displayUplinks')
// const sshDisplayOLTServiceProfiles = require('./ssh/displayOLTServiceProfiles')
const sshShowOpticalModuleInfo = require('./ssh/showOpticalModuleInfo')
// const sshDisplayDbaProfiles = require ('./ssh/displayDbaProfiles')
// const sshDisplayLineProfiles = require ('./ssh/displayLineProfiles')
// const sshDisplayVlans = require ('./ssh/displayVlans')
// const sshDisplayVlan = require ('./ssh/displayVlan')
// const sshScopeVlanInternet = require('./ssh/scopeVlanInternet')
// const sshScopeVlanLanToLan = require('./ssh/scopeVlanLanToLan')
// const sshdisplayUnconfiguredOnus = require ('./ssh/displayUnconfiguredOnus')
// // actions
// const sshCreateVlan = require('./ssh/createVlan')
// const sshDeleteVlan = require('./ssh/deleteVlan')
// const sshVlanTag = require('./ssh/vlanTag')
// const sshVlanUntag = require('./ssh/vlanUntag')
// const sshEnableAutoNegotiation = require('./ssh/enableAutoNegotiation')
// const sshDisableAutoNegotiation = require('./ssh/disableAutoNegotiation')
// const sshEnableUplink = require('./ssh/enableUplink')
// const sshDisableUplink = require('./ssh/disableUplink')
// const sshEnablePon = require('./ssh/enablePon')
// const sshDisablePon = require('./ssh/disablePon')
// const sshCreateDbaProfile = require('./ssh/createDbaProfile')
// const sshCreateSrvProfile = require('./ssh/createSrvProfile')
// const sshCreateOnu = require('./ssh/createOnu')
// const sshDeleteOnu = require('./ssh/deleteOnu')

// const telnetEnableRoot = require('./telnet/enableRoot')
// const telnetDisplayPermissionByUser = require('./telnet/displayPermissionByUser')
// const telnetDisplayBoard = require('./telnet/displayBoard')
// const telnetDisplayPons = require('./telnet/displayPon')

module.exports = {
  ssh: {
    checkStage: sshCheckStage,
    displayBoards: sshDisplayBoards,
    displaySlots: sshDisplaySlots,
    displayPons: sshDisplayPons,
    displayPon: sshDisplayPon,
    displayOnus: sshDisplayOnus,
    displayOnu: sshDisplayOnu,
    // displayUplinks: sshDisplayUplinks,
    // displayOLTServiceProfiles: sshDisplayOLTServiceProfiles,
    showOpticalModuleInfo: sshShowOpticalModuleInfo,
    // displayDbaProfiles: sshDisplayDbaProfiles,
    // displayLineProfiles: sshDisplayLineProfiles,
    // displayVlans: sshDisplayVlans,
    // displayVlan: sshDisplayVlan,
    // scopeVlanInternet: sshScopeVlanInternet,
    // scopeVlanLanToLan: sshScopeVlanLanToLan,
    // displayUnconfiguredOnus: sshdisplayUnconfiguredOnus,
    // // actions
    // createVlan: sshCreateVlan,
    // deleteVlan: sshDeleteVlan,
    // vlanTag: sshVlanTag,
    // vlanUntag: sshVlanUntag,
    // enableAutoNegotiation: sshEnableAutoNegotiation,
    // disableAutoNegotiation: sshDisableAutoNegotiation,
    // enableUplink: sshEnableUplink,
    // disableUplink: sshDisableUplink,
    // enablePon: sshEnablePon,
    // disablePon: sshDisablePon,
    // createDbaProfile: sshCreateDbaProfile,
    // createSrvProfile: sshCreateSrvProfile,
    // createOnu: sshCreateOnu,
    // deleteOnu: sshDeleteOnu
  },
//   telnet: {
//     enableRoot: telnetEnableRoot,
//     displayPermissionByUser: telnetDisplayPermissionByUser,
//     displayBoard: telnetDisplayBoard,
//     displayPon: telnetDisplayPons,
//   }
}