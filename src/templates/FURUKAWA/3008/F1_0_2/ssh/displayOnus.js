const { connect } = require('../../../../../config/ssh-connect')
const { column2json, day2time } = require('../../../../../utils/lib')

/*
>>> Coletar os dados da ONU POR PON
----------------------------------------------------------------
 OLT : 1, ONU : 1
----------------------------------------------------------------
 Activation Status                 : Active
 Last Activation Fail Reason       : -
 Deactivation Reason               : -
 Serial Number                     : FISAMDOTESeO
 Serial Number(Hex)                : 464953414D07f9eO
 Password (R-ID)                   : 00000000000000000000
 Description                       :
 Learning Method                   : auto
 Model Name                        : 630-10B
 MAC Address                       : D8:26:d4:07:f9:e0
 Eqo / RTD                         : 246723 / 64277 bit
 Fiber Distance                    : 5m
 ONU RX Pover                      : - 14.7 dBm
 MAX T-CONT                        : 7
 MAX US Priority Queue per T-CONT  : 8 (8/8/8/8/8/8/8/)
 T-CONT Scheduling Policy          : SPQ
 Activated Time                    : 0:00:01:22
 MIB Sync Number                   : 7
 SysupTinme                        : 0:00:09:28
 InactiveTtime                     : 0:00:00:00
 Vendor Product Code               : 0x0007
 Host Name                         :
 Encryption Key                    : 58 9f 6h 89 33 95 27 25 6a 07 58 99 3a 5c 25 Of
 OMCC Version                      : 0xao
 onu-profile                       : -
 VoIP Available signal protocol    : SIP / MGCP
 VoIP Available config method      : OMCI / Configuration file
 Power over Ethernet Control       : Not support
 Remote Debug                      : Support
 Remote Debug Format               : ASCIT
*/

const regexp = /---------------------------------------------------------------\n OLT : \d+, ONU : \d+\n---------------------------------------------------------------/gmi;

const displayOnus = async (options, { board = '1', slot = '1', port = '1' }) => {
  const conn = await connect({ 
    ...options,
    timeout: 30000, 
    keepaliveCountMax: 2,
    keepaliveInterval: 3000,
  })

  const cmd = `show onu detail-info ${port}`
  console.warn(cmd)
  const chunkDa = await conn.exec(cmd)
  if (!chunkDa && chunkDa === '') return null
  
  const chunkIt = chunkDa.split('\n')
  chunkIt.shift()

  const chunk = chunkIt.join('\n')
  const match = chunk.match(regexp)
  const splitted = chunk.split(regexp)
  splitted.shift()

  const data = splitted
    .map(item => column2json(
      item
      .split('\n')
      .map(item2 => 
        (item2 || '')
          .replace(':', '[$%]')
          .replace(/\:/gi, '-')
          .replace('[$%]', ':')
        )
      .splice(1))
    )
  return data.map((item, index) => {
    const index_match = match[index].match(/ONU : \d+/gi)
    const ont_id = String(index_match)
    const distance = parseInt((item.fiber_distance || '0').replace('m', ''), 10)

    return ({
      board,
      slot,
      port,
      ont_id: (ont_id || '').replace('ONU : ', '').trim(),
      // pon_type: 'gpon',
      // capability: 'bridging_routing',
      // allow_custom_profiles: false,
      // catv: false,
      temperature: 0,
      tx_power: 0,
      olt_rx_power: 0,
      catv_rx_power: 0,
      onu_type: item.model_name,
      name: item.name || '',
      rx_power: parseFloat((item.o_n_u_r_x_power || '').toLowerCase().replace('dbm', '').trim().replace(/ /gi, ''), 10),
      onu_external_id: item.host_name,
      serial_number: item.serial_number,
      mac_address: (item.m_a_c_address || '').replace(/\-/gi, ':'),
      description: item.description,
      distance: isNaN(distance) ? null : distance,
      stage: item.activation_status === 'Active' ? 'online' : 'disabled',
      authorization_at: new Date(), // TODO colocar uma tag de origem importada
      uptime_at: day2time(item.activated_time),
      custom_fields: {
        source: 'import_onu'
      }
    })
  })
}

module.exports = displayOnus