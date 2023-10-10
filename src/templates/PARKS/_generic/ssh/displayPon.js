const { connect } = require('../../../../config/ssh-connect')
const { column2json } = require('../../../../utils/lib')
const {
  removeJunksFromResponse,
  splitResponseByCommands,
  splitResponse,
  km2meters,
  PON_STATUS,
} = require('../../../../utils/parks')

// comandos:
// link performance (mostra erros do GPON)
// mac (mostra tabela mac)
// sfp (mostra dados do GBIC da porta)

/*
PARKS#show interface gpon1/1
Interface gpon1/1 is up, line protocol is up
  index 4 mtu 12000 
  HWaddr: 00:04:16:0e:f5:d3
  aging-time: 300s
  learning-mode move
  autonegotiation disabled speed-2.5G full-duplex
  Transceiver type any-reset-preamble (manually set)
    input rate 0 Kbps, 0 pps, rxload 0%
    input packets 0, bytes 0, dropped 0
    input errors 0, frame 0
    output rate 0 Kbps, 0 pps, txload 0%
    output packets 0, bytes 0
    output errors 0, collisions 0
  Line protocol is up for 19:47:06
PARKS#show interface gpon1/1 link information
Link Status and Operational Processes
----------------------------------------------------
Status: Active Working
Key Exchange: Disable, process interval: 10000 ms
Serial Acquisition: Enable, process interval: 10000 ms
Rogue detection state: Disable
Rogue Algorithm: Early Rogue Detection
LOS: Off

Link Transceiver
----------------------------------------------------
TRX Type: Any Reset Preamble

Link Parameters
----------------------------------------------------
Max Logical Distance: 40 km
Min Logical Distance: 0 km

Available Bandwidth
----------------------------------------------------
Total Bandwidth for CBR real-time Traffic: 610304 Kbits
Total Bandwidth for Guaranteed Traffic: 1234944 Kbits
Total Bandwidth after new ONU added: 1232768 Kbits

PARKS#show interface gpon1/1 mac

MAC table entries: 

INDEX  MAC ADDRESS  VLAN    GEM PORT      STATIC 

PARKS#show interface gpon1/1 sfp
Transceiver in interface gpon1/1.
----------------------------------------------
Transceiver
  Connector: SC
  Laser Wavelength: 1490 nm
  Encoding Mechanism: NRZ
  Nominal Bit Rate: 2500 Mbps
Vendor
  Name: TACLINK        
  PN: WXTRGP22SSC1   
  Rev: 000
  SN: WX18112395571  
  Data Code(YMDL): 181205 
Link Length Supported
  9/125 um fiber: 20000 m
Diagnostics (Internally Calibrated)
  Temperature: 40.41 C
  Supply Voltage: 3.32 V
  TX Output Power: 5.08 dBm
  RX Input Power: -18.12 dBm
PARKS#
*/

module.exports = async (options, { pon_type, board, slot, port }) => {
  const commands = {
    general: `show interface ${pon_type}${slot}/${port}`,
    link: `show interface ${pon_type}${slot}/${port} link information`,
    mac: `show interface ${pon_type}${slot}/${port} mac`,
    sfp: `show interface ${pon_type}${slot}/${port} sfp`,
  };

  let response = await (await connect(options))
    .execParks(commands)

  if (!response) return null

  response = splitResponse(response)
  response = removeJunksFromResponse(response)

  const instructions = splitResponseByCommands(response, commands)
  const link = column2json(instructions.link)

  return {
    board,
    slot,
    port,
    admin_status: false,
    operational_status: PON_STATUS[link.status] || 'down',
    description: '',
    min_range: km2meters(link.min_logical_distance),
    max_range: km2meters(link.max_logical_distance),
    scope: [],
    default_for_pon_ports: [],
  };
}
