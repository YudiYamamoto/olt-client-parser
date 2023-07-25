const sshDisplayUnconfiguredOnus = require('./ssh/displayUnconfiguredOnus')
const sshCreateOnu = require('./ssh/createOnu')
const sshEnableUplink = require('./ssh/enableUplink')
const sshDisableUplink = require('./ssh/disableUplink')
const sshDisplayTraffic = require('./ssh/displayTraffic')
const sshScopeVlanInternet = require('./ssh/scopeVlanInternet')
const sshScopeVlanLanToLan = require('./ssh/scopeVlanLanToLan')
const sshCheckStage = require('./ssh/checkStage')
const sshRunCommand = require('./ssh/runCommand')
const sshDisplayDbaProfiles = require('./ssh/displayDbaProfiles')
const sshDisplayLineProfiles = require('./ssh/displayLineProfiles')
const sshDisplayOnuProfiles = require('./ssh/displayOnuProfiles')
const sshDisplaySpeedProfiles = require('./ssh/displaySpeedProfiles')

module.exports = {
  ssh: {
    createOnu: sshCreateOnu,
    displayUnconfiguredOnus: sshDisplayUnconfiguredOnus,
    enableUplink: sshEnableUplink,
    disableUplink: sshDisableUplink,
    scopeVlanInternet: sshScopeVlanInternet,
    scopeVlanLanToLan: sshScopeVlanLanToLan,
    displayTraffic: sshDisplayTraffic,
    checkStage: sshCheckStage,
    runCommand: sshRunCommand,
    displayDbaProfiles: sshDisplayDbaProfiles,
    displayLineProfiles: sshDisplayLineProfiles,
    displayOnuProfiles: sshDisplayOnuProfiles,
    displaySpeedProfiles: sshDisplaySpeedProfiles,
  }
}