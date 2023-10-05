const { connect } = require('../../../../config/ssh-connect')
const { CHAR_NOT_FOUND } = require('../../../../utils/lib')

// O Summary mostra informações resumidas,
// mas tem outras coisas que daria pra pegar com outras
// variacoes invés de "summary" no final.

// RSSI => Sinal que a OLT esta recebendo da ONU
// Power level => Sinal que a ONU esta recebendo da OLT

/*
PARKS# show gpon onu prks00b80c94 config-errors
PARKS# show gpon onu prks00b80c94 dot1x-statistics
Index | Mac Address        | Connected Port | Connected Time
PARKS# show gpon onu prks00b80c94 information
ONU Status for ONU 1
-----------------------------------------------------
ONU Primary status: Active
PS Type C: No
Serial Number: PRKS00b80c94
Password: None
ONU disabled due to SN acquisition: No
OMCI port id: 1
BER interval: 120000 msec
Ranging Time: 442041
US FEC: Disable
ONU Deactivation Reason: None

Port ID table for ONU 1
-----------------------------------------------------
Port ID 1 - Active

Alloc ID table for ONU 1
-----------------------------------------------------
Alloc ID 0
Type: Non Dynamic
Fixed Real Time Bandwidth: 0 Kbits
Fixed Non Real Time Bandwidth: 256 Kbits
Guaranteed Bandwidth: 256 Kbits
Maximum Allocated Bandwidth: 256 Kbits
State: Active
PARKS# show gpon onu prks00b80c94 model
Fiberlink 1100B (SFU) Rev 2
PARKS# show gpon onu prks00b80c94 performance
US PON counters for ONU 1
-----------------------------------------------------
bip8 errors: 0
bip8 bytes: 2768721808
Unreceived burst: 0
Positive drift: 0
Negative drift: 0
FEC codewords: 0
FEC bytes corrected: 0
FEC codewords uncorrected: 0
RX PLOAMs with CRC Error: 0
RX PLOAMs Non Idle: 500
RX OMCI Packets with CRC Error: 0
BER reported: 0
RDI errors: 0
bip8 errors: 0

Port ID counters
-----------------------------------------------------
Port ID 1
RX Packets: 5068
RX Bytes: 243264
PARKS# show gpon onu prks00b80c94 rssi
	1-prks00b80c94:
		RSSI Level   : -19.32dBm (+-3dBm)
PARKS# show gpon onu prks00b80c94 status
	1-prks00b80c94:
		Status      : ACTIVE (PROVISIONED)
		Power Level : -24.94dBm (+-3dBm)
		RSSI        : -19.32dBm (+-3dBm)
PARKS# show gpon onu prks00b80c94 summary
Onu Index        :  1
Interface        :  gpon1/1
Serial           :  prks00b80c94
Alias            :
Model            :  Fiberlink 1100B (SFU) Rev 2
Status           :  ACTIVE (PROVISIONED)
RSSI             :  -19.32dBm (+-3dBm)
Power Level      :  -24.94dBm (+-3dBm)
Distance         :  0 m
Firmware Version :  2.7.3
Last Update      :  1 minute ago
IPHOST           :
*/

const junks = [
  '-----------------------------------------------------',
]

module.exports = async (options, { serial_number }) => {
  const commands = {
    'config-errors': `show gpon onu ${serial_number} config-errors`,
    'dot1x-statistics': `show gpon onu ${serial_number} dot1x-statistics`,
    'information': `show gpon onu ${serial_number} information`,
    'model': `show gpon onu ${serial_number} model`,
    'performance': `show gpon onu ${serial_number} performance`,
    'rssi': `show gpon onu ${serial_number} rssi`,
    'status': `show gpon onu ${serial_number} status`,
    'summary': `show gpon onu ${serial_number} summary`,
  };

  const response = await (await connect(options))
    .execParks(commands)

  if (!response) return null

  const splitted = response.split('\r\n')
  splitted.shift() // remove: 10.12.13.2: terminal length 0
  // Content
  splitted.pop()   // remove: PARKS#

  // remove junk lines
  let instructions = splitted.filter(line => {
    return !junks.map(junk => line === '' || line.indexOf(junk) !== CHAR_NOT_FOUND).includes(true)
  }).map(line => {
    return line
      .replaceAll('  ', '') // removes unwanted spaces
      .replaceAll(' :', ':') // removes unwanted spaces
      .trim()// removes blank spaces before and after
  })

  instructions = Object.entries(commands).map(([key, command]) => {
    let lines = []
    if (typeof lines[key] !== 'array') lines[key] = []

    lines[key].push(instructions.filter(instruction => {
        return instruction.indexOf(command) !== CHAR_NOT_FOUND
      }))

    return lines;
  })

  console.log(instructions.information);
  return;
  let vlans = splitted
    .join('') // make array of vlans
    .replace('Existing VLANs:', '') // removes the titles
    .trim() // removes blank spaces before and after
    .split(', ') // split vlans

  return vlans.map(vlan => {
    // exemple: vlan117 => 117
    // exemple: vlan1011-vlan1100 => 1011-1100
    vlan = vlan.replaceAll('vlan', '')

    if (vlan.indexOf('-') === CHAR_NOT_FOUND) return [Number(vlan)]
    return [...expandVlans(vlan)]
  }).reduce(function(previous, current) {
    return previous.concat(current.sort());
  }).sort((x, y) => x - y)
}
