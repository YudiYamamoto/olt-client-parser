const { connect } = require('../../../../../config/telnet-connect')
const { dummy2json, column2json, hour2time, str2mac } = require('../../../../../utils/lib')

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

const displayOnus = async (options, { board = '1', slot = '1', port = '1' }) => {
  // const conn = await connect(options)
  const f_p_s = `${board}/${slot}/${port}`
  const cmd = `show gpon onu detail-info gpon-onu_${f_p_s}`  
  const chunk = `ONU interface:         gpon-onu_1/12/1:1
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
  10   0000-00-00 00:00:00    0000-00-00 00:00:00`;
  
  const data = []
  for await (const [index] of Array.from({ length: 128 }).entries()) {
    const ont_id = index + 1
    /*
    // const chunk = await conn.exec(`${cmd}:${ont_id}`)
    */
    const [chunkData] = chunk.split('------------------------------------------')
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

    /*
    // const chunkMA = await conn.exec(`show mac gpon onu gpon-onu_${f_p_s}:${ont_id}`)
    */
    const chunckMA = `Total mac address : 1
 
Mac address      Vlan  Type      Port                      Vc
-------------------------------------------------------------------------------
c025.2ff5.555d   1201  Dynamic   gpon-onu_1/12/1:1        vport 1`

    const columns = [
      [0, 17],
      [17, 23],
      [23, 33],
      [33, 58],
      [58, 79],
    ]
    const [_line1, _line2, ...splitted] = chunckMA.split('\n')
    const [element] = dummy2json(splitted.join('\n'), columns, 1)

    /*
    // const chunkMA = await conn.exec(`show pon power attenuation gpon-onu_${f_p_s}:${ont_id}`)
    */
    const chunckSignal = `           OLT                  ONU              Attenuation
--------------------------------------------------------------------------
 up      Rx :-20.980(dbm)      Tx:2.359(dbm)        23.339(dB)

 down    Tx :6.819(dbm)        Rx:-17.560(dbm)      24.379(dB)`

    const [_header1, _header2, upSignal, _header3, downSignal] = chunckSignal.split('\n')
    
    const tx_power = downSignal.trim().substring(12, 27);
    const rx_power = downSignal.trim().substring(33, 47);
    const olt_rx_power = upSignal.trim().substring(12, 27);

    data.push({
      board,
      slot,
      port,
      ont_id,
      // pon_type: 'gpon',
      // capability: 'bridging_routing',
      // allow_custom_profiles: false,
      // catv: false,
      temperature: 0,
      tx_power: parseFloat((tx_power || '').toLowerCase().replace('dbm', '').trim().replace(/ /gi, ''), 10),
      olt_rx_power: parseFloat((olt_rx_power || '').toLowerCase().replace('dbm', '').trim().replace(/ /gi, ''), 10),
      catv_rx_power: 0,
      onu_type: item.type,
      name: item.name,
      rx_power: parseFloat((rx_power || '').toLowerCase().replace('dbm', '').trim().replace(/ /gi, ''), 10),
      onu_external_id: item.host_name,
      serial_number: item.serialnumber,
      mac_address: str2mac(element.macaddress.replace(/\./gi, '')),
      description: item.description,
      distance: parseInt((item.o_n_u_distance || '').replace('m', ''), 10),
      // Inactive
      stage: STATUS[item.phasestate] || 'disabled',
      authorization_at: new Date(), // TODO colocar uma tag de origem importada
      online_2: item.online_duration,
      uptime_at: hour2time(item.online_duration),
      custom_fields: {
        source: 'import_onu'
      }
    })
  }
      
  return data
}

module.exports = displayOnus