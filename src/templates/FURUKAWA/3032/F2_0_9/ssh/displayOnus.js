const { connect } = require('../../../../../config/ssh-connect')
const { getChunks } = require('../../../../../config/chunks')
const { column2json, day2time } = require('../../../../../utils/lib')
const { commandOpticalModuleInfo, generateOpticalModuleInfo } = require('./execOpticalModuleInfo')
const runCommand = require('../../../_generic/ssh/runCommand')



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

const base = ' OLT : GPON\\d+/\\d+, ONU : \\d+\\n---------------------------------------------------------------'
const regexp_base = new RegExp(base, 'gmi')
// const regexp = /---------------------------------------------------------------\n regexp_base/gmi;
const regexp = new RegExp(`---------------------------------------------------------------\\n${base}`, 'gmi')

const displayOnus = async (options, { 
  board = '1', 
  slot = '1', 
  pon_type: type = 'gpon', 
  port = '1', 
  authorization_at = new Date() 
}) => {
  const cmd = `show onu detail-info ${type} ${slot}/${port}`
  const conn = await connect(options)
  const chunk = await conn.exec(cmd)
  if (!chunk && chunk === '') return null

  const match = chunk.match(regexp_base)  
  const splitted = (`---------------------------------------------------------------\n ${chunk}`).split(regexp)

  const data = splitted
    .map(item => column2json(
      item
      .split('\n')
      .map(item2 => 
        item2
          .replace(':', '[$%]')
          .replace(/\:/gi, '-')
          .replace('[$%]', ':')
        )
      )
    )

  const values = []
  for await (const [index, item] of data.entries()) {
    const index_match = (match[index] || '').match(/ONU : \d+/gi)
    const ont_id = String(index_match)
    const distance = parseInt((item.fiber_distance || '0').replace('m', ''), 10)

    const onu_profile = item['onu-profile']
    const authorization_at_final = !onu_profile ? null : authorization_at

    values.push({
      board,
      slot,
      port,
      ont_id: ont_id.replace('ONU : ', '').trim(),
      // pon_type: 'gpon',
      // capability: 'bridging_routing',
      // allow_custom_profiles: false,
      // catv: false,
      temperature: -1,
      tx_power: -1,
      olt_rx_power: -1,
      catv_rx_power: 0,
      onu_type: item.model_name,
      name: item.name,
      rx_power: parseFloat((item.o_n_u_r_x_power || '').toLowerCase().replace('dbm', '').trim().replace(/ /gi, ''), 10),
      onu_external_id: item.host_name,
      serial_number: item.serial_number,
      mac_address: (item.m_a_c_address || '').replace(/\-/gi, ':'),
      description: item.description,
      onu_profile,
      distance: isNaN(distance) ? null : distance,
      stage: item.activation_status === 'Active' ? 'online' : 'disabled',
      authorization_at: authorization_at_final,
      uptime_at: day2time(item.activated_time),
      custom_fields: {
        ...item,
        source: 'import_onu',
      }
    })
  }

  const chunksOnus = getChunks(values, 30)
  if (!chunksOnus) return null
  
  const onus = []
  for await (const [_index, chunks] of chunksOnus.entries()) {
    const commandAdditionals = []
    for await (const onu of chunks) {
      if (onu && onu.ont_id && onu.ont_id !== '') commandAdditionals.push(commandOpticalModuleInfo(type, slot, port, onu.ont_id))
    }

    const chunksCommand = await runCommand(options, commandAdditionals.join('\n'))
    const arrayChunksCommand = (chunksCommand || '').split('\r\n')
    arrayChunksCommand.pop()
    arrayChunksCommand.shift()

    const blocks = arrayChunksCommand.join('\n').split('show onu ani optic-module-info').map(block => block.trim())
    for await (const [index, block] of blocks.entries()) {
      const lines = block.split('\n')
      lines.shift()
      lines.pop()
  
      const additionals = generateOpticalModuleInfo(lines)
      const { temperature = 0, tx_power = 0, olt_rx_power = 0, custom_fields } = additionals || {}
      const onu = { ...chunks[index] }
      onus.push({
        ...onu,
        temperature,
        tx_power,
        olt_rx_power,
        custom_fields: {
          ...onu.custom_fields,
          ...custom_fields,
          chunkIndex: index,
        } 
      })
    }
  }

  return onus
    .filter(item => item.board && item.slot && item.port)
}

module.exports = displayOnus