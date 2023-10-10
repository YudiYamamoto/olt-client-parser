const { connect } = require('../../../../config/ssh-connect')
const { column2json } = require('../../../../utils/lib')
const {
  removeJunksFromResponse,
  splitResponseByCommands,
  slitInterface,
  ONU_STATUS,
} = require('../../../../utils/parks')

// Power Level: Sinal que a ONU esta recebendo da OLT
// show interface gpon[id_slot/id_porta] onu status

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

module.exports = async (options, { interface }) => {
  let response = await (await connect(options))
    .execParks(`show interface ${interface} onu status`)

  if (!response) return null

  response = response.split('\r\n')
  response.shift() // remove: 10.12.13.2: terminal length 0
  response.shift() // remove: PARKS#show interface gpon1/1 onu status
  response.shift() // remove: Interface gpon1/1:
  // Content
  response.pop()   // remove: PARKS#

  response = removeJunksFromResponse(response)

  const regex = /(?<ont_id>\d+)-(?<serial_number>\w+):/;

  return response.map((item) => {
    return item.match(regex)?.groups;   
  }).filter(ont => ont !== undefined).map(ont => ({
    ont_id: ont.ont_id,
    serial_number: ont.serial_number,
    board: 0, //TODO: Pegar do parâmetro de interface
    slot: 0, //TODO: Pegar do parâmetro de interface
    type: null, //TODO: Pegar do parâmetro de interface
    real_type: null,
    software_version: null,
    available: null, //TODO: validar campo active
    role: 'main',
    custom_fields: {}
  }));
}
