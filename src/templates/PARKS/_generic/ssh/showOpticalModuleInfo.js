const { connect } = require('../../../../config/ssh-connect')
const { column2json } = require('../../../../utils/lib')
const {
  removeJunksFromResponse,
  splitResponseByCommands,
  slitInterface,
  ONU_STATUS,
} = require('../../../../utils/parks')

// Power Level: Sinal que a ONU esta recebendo da OLT
// show gpon onu   [SERIAL] summary

/*
10.12.13.2: terminal length 0
PARKS#show interface gpon1/1 onu status
Interface gpon1/1:
1-prks00b80c94:
Status      : ACTIVE (PROVISIONED)
Power Level : -22.67dBm (+-3dBm)
RSSI        : -18.36dBm (+-3dBm)
2-prks00ce1e95:
Status      : ACTIVE (PROVISIONED)
Power Level : -22.29dBm (+-3dBm)
RSSI        : -22.22dBm (+-3dBm)
3-prks00ce1e94:
Status      : ACTIVE (PROVISIONED)
Power Level : -25.08dBm (+-3dBm)
RSSI        : -17.67dBm (+-3dBm)
PARKS#
*/

module.exports = async (options, { serial_number }) => {
  let response = await (await connect(options))
    .execParks(`show gpon onu ${serial_number} summary`)

  if (!response) return null

  response = response.split('\r\n')
  response.shift() // remove: 10.12.13.2: terminal length 0
  response.shift() // remove: PARKS#show gpon onu prks00b80c94 summary

  // Content
  response.pop()   // remove: PARKS#

  response = removeJunksFromResponse(response)
  response = column2json(response)

  return {
    ont_id: response.onu_index, 
    rx_power: response.power_level,
    tx_power: null,
    olt_rx_ont_power_dbm: response.rssi,
    temperature_c: null,
    voltage_v: null,
    current_ma: null,
    distance_m: null,
    custom_fields: {
      ...response,
    }
  }
}
