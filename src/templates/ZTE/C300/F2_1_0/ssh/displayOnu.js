const { connect } = require('../../../../../config/ssh-connect')
const { column2json, hour2time } = require('../../../../../utils/lib')
const { runCommand: runCommandMac, generateCommmand: generateCommmandMac } = require('./displayMac')
const { runCommand: runCommandSignal, generateCommmand: generateCommmandSignal } = require('./displaySignal')

/*
ZXAN#show gpon onu detail-info gpon-onu_1/12/1:1

ONU interface:         gpon-onu_1/12/1:1
  Name:                mayararenata@hbnet.com
  Type:                F601
  State:               ready
  Configured channel:  auto
  Current channel:     1(GPON)
  Admin state:         enable
  Phase state:         working
  Config state:        success
  Authentication mode: sn
  SN Bind:             enable with SN check
  Serial number:       ZTEGCCEC5655
  Password:
  Description:         ONU-1:1
  Vport mode:          gemport
  DBA Mode:            Hybrid
  ONU Status:          enable
  OMCI BW Profile:
  Line Profile:        N/A
  Service Profile:     N/A
  ONU Distance:        1033m
  Online Duration:     127h 56m 21s
  FEC:                 none
  FEC actual mode:     N/A
  1PPS+ToD:            disable
  Auto replace:        disable
  Multicast encryption:disable
  Multicast encryption current state:N/A
------------------------------------------
       Authpass Time          OfflineTime             Cause
   1   2023-03-21 15:08:19    2023-03-25 16:03:23     DyingGasp
   2   2023-03-25 16:06:32    2023-03-26 10:59:52     DyingGasp
   3   2023-03-26 13:31:06    2023-03-29 00:16:47     DyingGasp
   4   2023-03-29 00:17:28    0000-00-00 00:00:00
   5   0000-00-00 00:00:00    0000-00-00 00:00:00
   6   0000-00-00 00:00:00    0000-00-00 00:00:00
   7   0000-00-00 00:00:00    0000-00-00 00:00:00
   8   0000-00-00 00:00:00    0000-00-00 00:00:00
   9   0000-00-00 00:00:00    0000-00-00 00:00:00
  10   0000-00-00 00:00:00    0000-00-00 00:00:00
*/

const STATUS = {
  'working': 'online',
  'LOS': 'los',
  'DyingGasp': 'pwr_fail',
}

const displayOnu = async (options, params) => {
  const { 
    pon_type: type = 'gpon', 
    board = '1', 
    slot = '1', 
    port = '1',
    ont_id = '1' 
  } = params
  const conn = await connect(options)
  const f_p_s = `${board}/${slot}/${port}`
  const cmdMac = generateCommmandMac(type, f_p_s, ont_id)
  const cmdSignal = generateCommmandSignal(type, f_p_s, ont_id)
  const cmd = `show ${type} onu detail-info ${type}-onu_${f_p_s}:${ont_id}
${cmdMac}
${cmdSignal}`
  const chunk = await conn.exec2(cmd)
  if (!chunk && chunk === '') return null

  const [chunkA, chunkRest] = chunk.split(cmdMac)
  const [chunkB, chunkC] = (chunkRest || cmdSignal).split(cmdSignal)

  const chunkB1 = (chunkB || '').split('\r\n')
  const chunkMA = ['', ...chunkB1].join('\r\n')

  const chunkC1 = (chunkC || '').split('\r\n')
  const chunkSignal = ['', ...chunkC1].join('\r\n')
  
  const splitted = chunkA.split('\r\n')
  splitted.pop()
  splitted.shift()
  splitted.shift()
  
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
  const { mac_address } = runCommandMac(chunkMA)
  const { tx_power, rx_power, olt_rx_power, catv_rx_power } = runCommandSignal(chunkSignal)
  
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
    authorization_at: new Date(), // TODO colocar uma tag de origem importada
    uptime_at: hour2time(item.online_duration),
    custom_fields: {
      source: 'import_onu',
    }
  }
      
  return data
}

module.exports = displayOnu