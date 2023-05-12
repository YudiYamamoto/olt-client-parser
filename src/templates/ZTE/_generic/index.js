const sshDisplayVlans = require('./ssh/displayVlans')
const sshDisplayVlan = require('./ssh/displayVlan')
const sshCreateVlan = require('./ssh/createVlan')
const sshvlanTag = require('./ssh/vlanTag')
const sshvlanUntag = require('./ssh/vlanUntag')
const sshshowOpticalModuleInfo = require('./ssh/showOpticalModuleInfo')
const sshremoveVlanUplink = require('./ssh/removeVlanUplink')
const sshshowVlanPort = require('./ssh/showVlanPort')
const enableAutoNegotiation = require('./ssh/enableAutoNegotiation')
const disableAutoNegotiation = require('./ssh/disableAutoNegotiation')
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
const enableTrunkMode = require('./ssh/enableTrunkMode')

module.exports = {
  ssh: {
    displayVlans: sshDisplayVlans,
    displayVlan: sshDisplayVlan,
    createVlan: sshCreateVlan,
    vlanTag: sshvlanTag,
    vlanUntag: sshvlanUntag,
    showOpticalModuleInfo: sshshowOpticalModuleInfo,
    showVlanPort: sshshowVlanPort,
    removeVlanUplik: sshremoveVlanUplink,
    enableAutoNegotiation: enableAutoNegotiation,
    disableAutoNegotiation: disableAutoNegotiation,
    enableTrunkMode: enableTrunkMode,
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
  }
}