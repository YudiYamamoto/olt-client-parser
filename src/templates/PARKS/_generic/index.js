const sshCheckStage = require('./ssh/checkStage')
const sshDisplaySlots = require('./ssh/displaySlots')
const sshDisplayVlans = require('./ssh/displayVlans')
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
    displaySlots: sshDisplaySlots,
    displayVlans: sshDisplayVlans,
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
