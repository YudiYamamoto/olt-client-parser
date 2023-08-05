const sshDisplayBoards = require('./ssh/displayBoards')
const sshDisplaySlots = require('./ssh/displaySlots')
const sshDisplayPons = require('./ssh/displayPons')
const sshDisplayPon = require('./ssh/displayPon')
const sshDisplayOnus = require('./ssh/displayOnus')
const sshDisplayOnu = require('./ssh/displayOnu')

const sshDisplayVlans = require('./ssh/displayVlans')
const sshDisplayVlan = require('./ssh/displayVlan')
const sshCreateVlan = require('./ssh/createVlan')
const sshVlanTag = require('./ssh/vlanTag')
const sshVlanUntag = require('./ssh/vlanUntag')
const sshshowOpticalModuleInfo = require('./ssh/showOpticalModuleInfo')
const sshremoveVlanUplink = require('./ssh/removeVlanUplink')
const sshshowVlanPort = require('./ssh/showVlanPort')
const sshEnableAutoNegotiation = require('./ssh/enableAutoNegotiation')
const sshDisableAutoNegotiation = require('./ssh/disableAutoNegotiation')
const sshDeleteVlan = require('./ssh/deleteVlan')
const sshScopeVlanLanToLan = require('./ssh/scopeVlanLanToLan')
const sshScopeVlanInternet = require('./ssh/scopeVlanInternet')
const sshEnableVlanScopeLanToLan = require('./ssh/enableVlanScopeLanToLan')
const sshDisableVlanScopeLanToLan = require('./ssh/disableVlanScopeLanToLan')
const sshEnableVlanScopeInternet = require('./ssh/enableVlanScopeInternet')
const sshDisableVlanScopeInternet = require('./ssh/disableVlanScopeInternet')

const sshDisplayUplinks = require('./ssh/displayUplinks')
const sshEnableUplink = require('./ssh/enableUplink')
const sshDisableUplink = require('./ssh/disableUplink')

const sshEnablePon = require('./ssh/enablePon')
const sshDisablePon = require('./ssh/disablePon')

const sshCreateOnu = require('./ssh/createOnu')

const sshEnableTrunkMode = require('./ssh/enableTrunkMode')

const sshDisplaySpeedProfiles = require('./ssh/displaySpeedProfiles')

const sshDisplayDbaProfiles = require('./ssh/displayDbaProfiles')

const sshDisplayUnconfiguredOnus = require('./ssh/displayUnconfiguredOnus')

const sshDisplayTraffic = require('./ssh/displayTraffic')

const sshCheckStage = require('./ssh/checkStage')

const sshDisplayOLTServiceProfiles = require('./ssh/displayOLTServiceProfiles')

module.exports = {
  ssh: {
    checkStage: sshCheckStage,
    displayBoards: sshDisplayBoards,
    displaySlots: sshDisplaySlots,
    displayPons: sshDisplayPons,
    displayPon: sshDisplayPon,
    displayOnus: sshDisplayOnus,
    displayOnu: sshDisplayOnu,
    displayDbaProfiles: sshDisplayDbaProfiles,
    displaySpeedProfiles: sshDisplaySpeedProfiles,
    displayOLTServiceProfiles: sshDisplayOLTServiceProfiles,
    displayVlans: sshDisplayVlans,
    displayVlan: sshDisplayVlan,
    createVlan: sshCreateVlan,
    vlanTag: sshVlanTag,
    vlanUntag: sshVlanUntag,
    showOpticalModuleInfo: sshshowOpticalModuleInfo,
    showVlanPort: sshshowVlanPort,
    removeVlanUplik: sshremoveVlanUplink,
    enableAutoNegotiation: sshEnableAutoNegotiation,
    disableAutoNegotiation: sshDisableAutoNegotiation,
    enableTrunkMode: sshEnableTrunkMode,
    deleteVlan: sshDeleteVlan,
    scopeVlanLanToLan: sshScopeVlanLanToLan,
    scopeVlanInternet: sshScopeVlanInternet,
    enableVlanScopeLanToLan: sshEnableVlanScopeLanToLan,
    disableVlanScopeLanToLan: sshDisableVlanScopeLanToLan,
    enableVlanScopeInternet: sshEnableVlanScopeInternet,
    disableVlanScopeInternet: sshDisableVlanScopeInternet,

    displayUplinks: sshDisplayUplinks,
    enableUplink: sshEnableUplink,
    disableUplink: sshDisableUplink,

    enablePon: sshEnablePon,
    disablePon: sshDisablePon,

    createOnu: sshCreateOnu,

    displayUnconfiguredOnus: sshDisplayUnconfiguredOnus,
    displayTraffic: sshDisplayTraffic,
  }
}