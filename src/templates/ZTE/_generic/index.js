const sshDisplayVlans = require('./ssh/displayVlans')
const sshDisplayVlan = require('./ssh/displayVlan')
const sshCreateVlan = require('./ssh/createVlan')
const sshVlanTag = require('./ssh/vlanTag')
const sshVlanUntag = require('./ssh/vlanUntag')
const sshShowInterfaceOpticalModuleInfo = require('./ssh/showInterfaceOpticalModuleInfo')
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

const sshEnableTrunkMode = require('./ssh/enableTrunkMode') // TODO Validar

const sshDisplaySpeedProfiles = require('./ssh/displaySpeedProfiles')

const sshDisplayDbaProfiles = require('./ssh/displayDbaProfiles')

const sshDisplayUnconfiguredOnus = require('./ssh/displayUnconfiguredOnus')

const sshDisplayTraffic = require('./ssh/displayTraffic')

const sshCheckStage = require('./ssh/checkStage')

const sshRunCommand = require('./ssh/runCommand')

module.exports = {
  ssh: {
    displayDbaProfiles: sshDisplayDbaProfiles,
    displaySpeedProfiles: sshDisplaySpeedProfiles,
    displayVlans: sshDisplayVlans,
    displayVlan: sshDisplayVlan,
    createVlan: sshCreateVlan,
    vlanTag: sshVlanTag,
    vlanUntag: sshVlanUntag,
    showInterfaceOpticalModuleInfo: sshShowInterfaceOpticalModuleInfo,
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

    checkStage: sshCheckStage,
    displayTraffic: sshDisplayTraffic,

    runCommand: sshRunCommand,
  }
}