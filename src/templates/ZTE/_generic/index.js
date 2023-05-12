const sshDisplayVlans = require('./ssh/displayVlans')
const sshDisplayVlan = require('./ssh/displayVlan')
const sshCreateVlan = require('./ssh/createVlan')
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

module.exports = {
  ssh: {
    displayVlans: sshDisplayVlans,
    displayVlan: sshDisplayVlan,
    createVlan: sshCreateVlan,
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