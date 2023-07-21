const sshDisplayUplinks = require('./ssh/displayUplinks')
const sshDisplayUnconfiguredOnus = require('./ssh/displayUnconfiguredOnus')
const sshCreateOnu = require('./ssh/createOnu')
const sshEnableUplink = require('./ssh/enableUplink')
const sshDisableUplink = require('./ssh/disableUplink')
const sshDisplayVlans = require('./ssh/displayVlans')
const sshDisplayVlan = require('./ssh/displayVlan')
const sshDisplayTraffic = require('./ssh/displayTraffic')
const sshScopeVlanInternet = require('./ssh/scopeVlanInternet')
const sshScopeVlanLanToLan = require('./ssh/scopeVlanLanToLan')
const sshCheckStage = require('./ssh/checkStage')
const sshRunCommand = require('./ssh/runCommand')
const sshDisplayDbaProfiles = require('./ssh/displayDbaProfiles')
const sshDisplayLineProfiles = require('./ssh/displayLineProfiles')
const sshDisplayOnuProfiles = require('./ssh/displayOnuProfiles')
const sshDisplayOLTServiceProfiles = require('./ssh/displayOLTServiceProfiles')

module.exports = {
  ssh: {
    displayUplinks: sshDisplayUplinks,
    createOnu: sshCreateOnu,
    displayUnconfiguredOnus: sshDisplayUnconfiguredOnus,
    enableUplink: sshEnableUplink,
    disableUplink: sshDisableUplink,
    displayVlans: sshDisplayVlans,
    displayVlan: sshDisplayVlan,
    scopeVlanInternet: sshScopeVlanInternet,
    scopeVlanLanToLan: sshScopeVlanLanToLan,
    displayTraffic: sshDisplayTraffic,
    checkStage: sshCheckStage,
    runCommand: sshRunCommand,
    displayDbaProfiles: sshDisplayDbaProfiles,
    displayLineProfiles: sshDisplayLineProfiles,
    displayOnuProfiles: sshDisplayOnuProfiles,
    displayOLTServiceProfiles: sshDisplayOLTServiceProfiles,
  }
}