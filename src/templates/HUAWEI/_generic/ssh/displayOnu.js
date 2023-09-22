const { connect } = require('../../../../config/ssh-connect')
const { column2json,  hour2time, str2mac } = require('../../../../utils/lib')

/*
  '  F/S/P                   : 0/0/0',
  '  ONT-ID                  : 0',
  '  Control flag            : active',
  '  Run state               : online',
  '  Config state            : normal',
  '  Match state             : mismatch',
  '  DBA type                : SR',
  '  ONT distance(m)         : 17',
  '  ONT last distance(m)    : 18',
  '  ONT battery state       : not support',
  '  ONT power type          : -',
  '  Memory occupation       : 35%',
  '  CPU occupation          : 1%',
  '  Temperature             : 50(C)',
  '  Authentic type          : SN-auth',
  '  SN                      : 4857544302D8C93F (HWTC-02D8C93F)',
  '  Management mode         : OMCI',
  '  Software work mode      : normal',
  '  Isolation state         : normal',
  '  ONT IP 0 address/mask   : -',
  '  Description             : testeont',
  '  Last down cause         : dying-gasp',
  '  Last up time            : 20/09/2023 06:52:18-03:00',
  '  Last down time          : 20/09/2023 06:46:41-03:00',
  '  Last dying gasp time    : 20/09/2023 06:46:41-03:00',
  '  ONT online duration     : 2 day(s), 4 hour(s), 17 minute(s), 35 second(s) ',
*/

const STATUS = {
  'working': 'online',
  'LOS': 'los',
  'DyingGasp': 'pwr_fail',
}

const displayOnu = async (options, { 
  pon_type: type = 'gpon', 
  board = '0', 
  slot = '0', 
  port = '0', 
  ont_id = '0',
  authorization_at = new Date(),
}) => {
  const conn = await connect(options)
  const f_p_s = `${board} ${slot} ${port}`
  const cmd = `enable
  config
  display ont info ${f_p_s}`  
  const chunk = await conn.exec7(`${cmd} ${ont_id}`)
  
  if (!chunk && chunk === '') return null;
  
  const splitted = chunk.split('\r\n')
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.shift()
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
    )
  console.log(item)
  
  const element = ''
  const tx_power = (item.tx_power || '-').replace('-', '').replace('dbm', '')
  const olt_rx_power = (item.olt_rx_power || '-').replace('-', '').replace('dbm', '')
  const rx_power = (item.rx_power || '-').replace('-', '').replace('dbm', '')
  const distance = (item['o_n_tlastdistance(m)'] || '-').replace('-', '').replace('m', '')
  
  const authorization_at_final = authorization_at || new Date()

  const data = {
    board,
    slot,
    port,
    ont_id,
    // pon_type: 'gpon',
    // capability: 'bridging_routing',
    // allow_custom_profiles: false,
    // catv: false,
    temperature: parseFloat((item.temperature || '0').toLowerCase().replace('c', '').trim().replace(/ /gi, ''), 10),
    tx_power: parseFloat((tx_power || '0').toLowerCase().replace('dbm', '').trim().replace(/ /gi, ''), 10),
    olt_rx_power: parseFloat((olt_rx_power || '0').toLowerCase().replace('dbm', '').trim().replace(/ /gi, ''), 10),
    catv_rx_power: 0,
    onu_type: type,
    name: item.name || '',
    rx_power: parseFloat((rx_power || '0').toLowerCase().replace('dbm', '').trim().replace(/ /gi, ''), 10),
    onu_external_id: item.sn,
    serial_number: item.sn,
    mac_address: str2mac((element.macaddress || element || '').replace(/\./gi, '')).replace(/\-/gi, ':'),
    description: item.description,
    distance: parseInt(distance !== '' ? distance : '0', 10),
    stage: item['runstate'],
    authorization_at: authorization_at_final,
    uptime_at: hour2time(item.online_duration),
    custom_fields: {
      source: 'import_onu',
    }
  }
      
  return data
}

module.exports = displayOnu