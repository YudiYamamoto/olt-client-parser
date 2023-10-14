const { connect } = require('../../../../config/ssh-connect')
const { hour2time } = require('../../../../utils/lib')
const { removeJunksFromResponse } = require('../../../../utils/parks')

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

const regex = /(?<ont_id>\d+)-(?<serial_number>\w+):/

module.exports = async (options, { pon_type = 'gpon', board = '0', slot = '0', port = '0' }) => {
  const interface = `${pon_type}${slot}/${port}`
  const chunks = await (await connect(options)).execParks(`show interface ${interface} onu status`)
  if (!chunks) return null

  const splitted = chunks.split('\r\n')
  splitted.shift() // remove: 10.12.13.2: terminal length 0
  splitted.shift() // remove: PARKS#show interface gpon1/1 onu status
  splitted.shift() // remove: Interface gpon1/1:
  splitted.pop()   // remove: PARKS#

  const tx_power = '0'
  const distance = 0
  const element = ''

  return splitted
    .map((item) => item.match(regex)?.groups)
    .filter(ont => !!ont)
    .map(item => {
      const index = splitted.findIndex(x => x.indexOf(item.serial_number) > -1)
      const [status, power_level, rssi] = splitted.slice(index + 1, index + 4)

      const stage = status.indexOf('ACTIVE') ? 'online' : 'disabled'
      const [olt_rx_power] = power_level.trim().replace('Power Level : ', '').split(' (')
      const [rx_power] = rssi.trim().replace('RSSI        : ', '').split(' (')

      return {
        board, 
        slot, 
        port,
        ont_id: item.ont_id,
        temperature: 0,
        tx_power: parseFloat((tx_power || '').toLowerCase().replace('dbm', '').trim().replace(/ /gi, ''), 10),
        olt_rx_power: parseFloat((olt_rx_power || '').toLowerCase().replace('dbm', '').trim().replace(/ /gi, ''), 10),
        catv_rx_power: 0,
        onu_type: item.type, // GENERIC
        name: item.name,
        rx_power: parseFloat((rx_power || '').toLowerCase().replace('dbm', '').trim().replace(/ /gi, ''), 10),
        onu_external_id: item.serial_number,
        serial_number: item.serial_number,
        mac_address: (element || ''),
        description: item.description,
        distance: parseInt(distance !== '' ? distance : '0', 10),
        stage,
        uptime_at: hour2time(item.online_duration),
        custom_fields: {
          ...item,
          status,
          power_level,
          rssi,
          source: 'import_onu',
        }
      }
    })
}
