const { column2json, hour2time } = require('../../../../../utils/lib')
const { runCommand: runCommandMac } = require('../common/mac')
const { runCommand: runCommandSignal } = require('../common/signal')

const generateCommmand = (type, f_p_s, ont_id) => `show ${type} onu detail-info ${type}_onu-${f_p_s}:${ont_id}`

const cmdMac = 'show mac '
const cmdSignal = ' power attenuation '

const STATUS = {
  'working': 'online',
  'LOS': 'los',
  'DyingGasp': 'pwr_fail',
}

const runCommand = (chunk, board, slot, port, ont_id) => {
  if (!chunk && chunk === '') return null

  const [chunkA, chunkRest] = chunk.split(cmdMac)
  const [chunkB, chunkC] = (chunkRest || cmdSignal).split(cmdSignal)

  const chunkB1 = (chunkB || '').split('\r\n')
  const chunkMA = ['', ...chunkB1].join('\r\n')

  const chunkC1 = (chunkC || '').split('\r\n')
  const chunkSignal = ['', ...chunkC1].join('\r\n')
  
  const splitted = chunkA.split('\r\n')
  splitted.pop()
  splitted.pop()
  splitted.pop()
  
  const [chunkData] = splitted.join('\n').split('------------------------------------------')
  const item = column2json(
    chunkData
    .split('\n')
    .map(item2 => 
      item2
        .replace(':', '[$%]')
        .replace(/\:/gi, '-')
        .replace('[$%]', ':')
      )
    .splice(1))

  const distance = (item.o_n_u_distance || '-').replace('-', '').replace('m', '')
  const { mac_address } = runCommandMac(`test\r\n${chunkMA}`)
  const { tx_power, rx_power, olt_rx_power, catv_rx_power } = runCommandSignal(chunkSignal)

  const authorization_at_final = new Date()
  
  const data = {
    board,
    slot,
    port,
    ont_id,
    // pon_type: 'gpon',
    // capability: 'bridging_routing',
    // allow_custom_profiles: false,
    // catv: false,
    temperature: 0,
    tx_power,
    rx_power,
    olt_rx_power,
    catv_rx_power,
    onu_type: item.type,
    name: item.name,
    onu_external_id: item.serialnumber,
    serial_number: item.serialnumber,
    mac_address,
    description: item.description,
    distance: parseInt(distance !== '' ? distance : '0', 10),
    stage: STATUS[item.phasestate] || 'disabled',
    authorization_at: authorization_at_final,
    uptime_at: hour2time(item.online_duration),
    custom_fields: {
      source: 'import_onu',
    }
  }

  return data
}

module.exports = {
  generateCommmand,
  runCommand,
}