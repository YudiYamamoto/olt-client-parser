const { column2json, hour2time } = require('../../../../utils/lib')
const chance = require('chance').Chance()

const STATUS = {
  'working': 'online',
  'LOS': 'los',
  'DyingGasp': 'pwr_fail',
}

const displayOnu = async (_options, { 
  pon_type: type = 'gpon',
  board = '1', 
  slot = '1', 
  port = '1',
  ont_id = '1', 
  serial_number: serial_number_original, 
  mac_address: mac_address_original,
  authorization_at
}) => {
  const f_p_s = `${board}/${slot}/${port}`

  const hasData = authorization_at ? true : chance.bool({ likelihood: 55 })
  if (!hasData) return

  const randomStatus = () => {
    return chance.bool({ likelihood: 80 }) 
      ? 'working' : chance.bool({ likelihood: 50 }) 
      ? 'LOS' : 'DyingGasp'
  }

  const randomDbaMode = () => {
    return chance.bool({ likelihood: 80 }) 
      ? 'Hybrid' : chance.bool({ likelihood: 50 }) 
      ? 'Access' : chance.bool({ likelihood: 50 }) 
      ? 'Trunk' : 'Transparent'
  }

  const randomOnuType = () => `MD000-${type[0].toUpperCase()}${chance.integer({ min: 1, max: '4' })}`
  const randomSerialNumber = () => `MB${board}S${slot}R${type.toUpperCase()}${port.padStart(2, '0')}`
  
  const chunk = `
ZXAN#show ${type} onu detail-info ${type}-onu_${f_p_s}:${ont_id}

ONU interface:          ${type}_onu-${f_p_s}:${ont_id}
  Name:                 ${chance.string({ length: 8, casing: 'upper', alpha: true, numeric: true })}
  Splitter:             
  Type:                 ${randomOnuType()}
  Configured speed mode:auto
  Current speed mode:   ${type.toUpperCase()}
  Admin state:          ${chance.bool({ likelihood: 70 }) ? 'enable' : 'disable'}
  Phase state:          ${randomStatus()}
  Config state:         fail
  Authentication mode:  sn
  SN Bind:              enable with SN check
  Serial number:        ${serial_number_original || randomSerialNumber()}
  Password:             
  Description:          ${chance.string({ length: 15, casing: 'upper', alpha: true, numeric: true })}
  Vport mode:           gemport
  DBA Mode:             ${randomDbaMode()}
  ONU Status:           ${chance.bool({ likelihood: 70 }) ? 'enable' : 'disable'}
  OMCI BW Profile:      704kbps
  OMCC Encrypt:         disable
  Line Profile:         N/A
  Service Profile:      N/A
  ONU Distance:         ${chance.integer({ min: 0, max: 10000 })}m
  Online Duration:      ${chance.integer({ min: 15, max: 100 })}h ${chance.integer({ min: 0, max: 59 })}m ${chance.integer({ min: 0, max: 59 })}s
  FEC:                  disable
  FEC actual mode:      disable
  1PPS+ToD:             disable
  Auto replace:         disable 
  Multicast encryption: disable
  Multicast encryption current state:N/A
------------------------------------------
       Authpass Time          OfflineTime             Cause
   1   2022-12-22 23:53:29    2022-12-25 13:19:56     ${randomStatus()}     
   2   2022-12-25 13:20:40    2022-12-25 13:30:21     ${randomStatus()}     
   3   2022-12-25 13:31:07    2022-12-27 17:14:39     ${randomStatus()} 
   4   2022-12-27 17:54:32    2022-12-28 07:37:40     ${randomStatus()} 
   5   2022-12-28 08:12:33    2023-01-07 07:57:42     ${randomStatus()} 
   6   2023-01-07 07:58:35    2023-01-19 22:07:53     ${randomStatus()} 
   7   2023-01-19 22:08:50    2023-01-30 18:32:13     ${randomStatus()}     
   8   2023-01-30 18:37:32    2023-01-30 18:38:39     ${randomStatus()} 
   9   2023-01-30 18:39:34    2023-02-26 06:04:58     ${randomStatus()} 
  10   2023-02-26 06:06:03    2023-03-08 20:12:31     ${randomStatus()} `
  if (!chunk && chunk === '') return
  
  const splitted = chunk.split('\n')
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
    )

  let element = ''
  const chunkMA = `177.128.98.246: terminal length 512
IRARA-OLT#show mac interface vport-${f_p_s}.${ont_id}:1
Total mac address : 1

Mac address      Vlan  Type      Port                  Vc                      
            
-------------------------------------------------------------------------------
${mac_address_original || chance.mac_address()}   2516   Dynamic   vport-${f_p_s}.${ont_id}:1:1                 
IRARA-OLT#`
  if (chunkMA && chunkMA !== '') {
    const [_line1, _line2, _line3, _line4, ...splitted] = chunkMA.split('\n')
    element = (splitted && (splitted[3] || '').substring(0, 19).trim()) || ''
  }

  let tx_power = 0
  let rx_power = 0
  let olt_rx_power = 0
  const chunckSignal = `177.128.98.246: terminal length 512
IRARA-OLT#show pon power attenuation gpon_onu-1/1/16:1
          OLT                  ONU              Attenuation
--------------------------------------------------------------------------
up      Rx :${chance.floating({ min: -100, max: 100, fixed: 3 })}(dbm)      Tx:${chance.floating({ min: -100, max: 100, fixed: 3 })}(dbm)      ${chance.floating({ min: -100, max: 100, fixed: 3 })}(dB)     

down    Tx :${chance.floating({ min: -100, max: 100, fixed: 3 })}(dbm)      Rx:${chance.floating({ min: -100, max: 100, fixed: 3 })}(dbm)      ${chance.floating({ min: -100, max: 100, fixed: 3 })}(dB)     
IRARA-OLT#`

  if (chunckSignal && chunckSignal !== '') {
    const [_header0, _header1, _header2, _header3, upSignal, _header4, downSignal] = chunckSignal.split('\n')
    
    if (downSignal) {
      tx_power = downSignal.trim().substring(12, 27)
      rx_power = downSignal.trim().substring(33, 47)
    }
    if (upSignal) olt_rx_power = upSignal.trim().substring(12, 27)
  }

  const distance = chance.integer({ min: 0, max: 10000 })

  return {
    board,
    slot,
    port,
    ont_id,
    // pon_type: 'gpon',
    // capability: 'bridging_routing',
    // allow_custom_profiles: false,
    // catv: false,
    temperature: chance.floating({ min: -100, max: 100, fixed: 3 }),
    tx_power: parseFloat((tx_power || '').toLowerCase().replace('dbm', '').trim().replace(/ /gi, ''), 10),
    olt_rx_power: parseFloat((olt_rx_power || '').toLowerCase().replace('dbm', '').trim().replace(/ /gi, ''), 10),
    catv_rx_power: 0,
    onu_type: item.type,
    name: item.name,
    rx_power: parseFloat((rx_power || '').toLowerCase().replace('dbm', '').trim().replace(/ /gi, ''), 10),
    onu_external_id: item.serialnumber,
    serial_number: item.serialnumber,
    mac_address: (element || ''),
    description: item.description,
    distance: parseInt(distance !== '' ? distance : '0', 10),
    stage: STATUS[item.phasestate] || 'disabled',
    authorization_at: new Date(),
    uptime_at: hour2time(item.online_duration),
    custom_fields: {
      source: 'import_onu',
    }
  }
}

module.exports = displayOnu