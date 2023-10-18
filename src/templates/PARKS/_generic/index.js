const sshCheckStage = require('./ssh/checkStage')
const sshDisplayBoards = require('./ssh/displayBoards')
const sshDisplaySlots = require('./ssh/displaySlots')
const sshDisplayVlans = require('./ssh/displayVlans')
const sshDisplayUplinks = require('./ssh/displayUplinks')
const sshDisplayLineProfiles = require('./ssh/displayLineProfiles')
const sshShowVlanPort = require('./ssh/showVlanPort')
const sshDisplayOnu = require('./ssh/displayOnu')
const sshDisplayPon = require('./ssh/displayPon')
const sshDisplayPons = require('./ssh/displayPons')
const sshDisplayOnus = require('./ssh/displayOnus')
const sshShowOpticalModuleInfo = require('./ssh/showOpticalModuleInfo')
const sshDisplayDbaProfiles = require('./ssh/displayDbaProfiles')
const sshDisplayUnconfiguredOnus = require ('./ssh/displayUnconfiguredOnus')
// actions
const sshEnableTrunkMode = require('./ssh/enableTrunkMode')
const sshCreateVlan = require('./ssh/createVlan')
const sshDeleteVlan = require('./ssh/deleteVlan')
const sshVlanTag = require('./ssh/vlanTag')
const sshVlanUntag = require('./ssh/vlanUntag')
const sshRemoveVlanUplink = require('./ssh/removeVlanUplink')
const sshEnableAutoNegotiation = require('./ssh/enableAutoNegotiation')
const sshDisableAutoNegotiation = require('./ssh/disableAutoNegotiation')
const sshDisableUplink = require('./ssh/disableUplink')
const sshEnableUplink = require('./ssh/enableUplink')
const sshRunCommand = require('./ssh/runCommand')
const sshDisablePon = require('./ssh/disablePon')
const sshEnablePon = require('./ssh/enablePon')

module.exports = {
  ssh: {
    checkStage: sshCheckStage,
    displayBoards: sshDisplayBoards,
    displaySlots: sshDisplaySlots,
    displayVlans: sshDisplayVlans,
    displayUplinks: sshDisplayUplinks,
    showVlanPort: sshShowVlanPort,
    displayLineProfiles: sshDisplayLineProfiles,
    displayOnu: sshDisplayOnu,
    displayPon: sshDisplayPon,
    displayPons: sshDisplayPons,
    displayOnus: sshDisplayOnus,
    showOpticalModuleInfo: sshShowOpticalModuleInfo,
    displayDbaProfiles: sshDisplayDbaProfiles,
    displayUnconfiguredOnus: sshDisplayUnconfiguredOnus,
    // actions
    enableTrunkMode: sshEnableTrunkMode,
    createVlan: sshCreateVlan,
    deleteVlan: sshDeleteVlan,
    vlanTag: sshVlanTag,
    vlanUntag: sshVlanUntag,
    removeVlanUplink: sshRemoveVlanUplink,
    enableAutoNegotiation: sshEnableAutoNegotiation,
    disableAutoNegotiation: sshDisableAutoNegotiation,
    disableUplink: sshDisableUplink,
    enableUplink: sshEnableUplink,
    runCommand: sshRunCommand,
    disablePon: sshDisablePon,
    enablePon: sshEnablePon,
  },
}