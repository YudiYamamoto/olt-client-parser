const { connect } = require('../../../../config/ssh-connect')
const { dummy2json, column2json, hour2time, str2mac } = require('../../../../utils/lib')

/*
IRARA-OLT#show vlan 1
vlanid          :1
name            :VLAN0001
description     :N/A
multicast-packet:flood-unknown
protocol-filter :N/A
cos-to-dei      :N/A
dei-mark        :disable
tpid            :N/A
forwarding-mode :vlan-mac
status          :OK
cos copy-to-inner :N/A
cos copy-to-outer :N/A
port(untagged):
port(tagged):
IRARA-OLT#
*/

const displayVlan = async (options, vlan) => {
  const conn = await connect(options)
  const cmd = `show vlan ${vlan}`
  const chunk = await conn.exec2(cmd)

  const splitted = chunk.split('\r\n')
  splitted.shift()
  splitted.shift()
  splitted.pop()
  const item = column2json(
    splitted
    .map(item2 => 
      item2
        .replace(':', '[$%]')
        .replace(/\:/gi, '-')
        .replace('[$%]', ':')
      )
    .splice(1))
  
  const data = { 
    name: vlan, 
    description: item.description,
    custom_fields: {
      ...item
    }
  }
  return data
}

module.exports = displayVlan

/*

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

    let element = {}
    const cmd2 = `show mac gpon onu gpon-onu_${f_p_s}:${ont_id}`
    const chunkMA = await conn.exec2(cmd2)
    if (chunkMA && chunkMA !== '') {
      const [_line1, _line2, _line3, _line4, ...splitted1] = chunkMA.split('\r\n')
      const columns = [
        [0, 17],
        [17, 23],
        [23, 33],
        [33, 58],
        [58, 79],
      ]
      splitted1.pop()
      const elements = dummy2json(splitted1.join('\n'), columns, 1)
      element = elements[0] || {}
    }
    
    let tx_power = 0;
    let rx_power = 0;
    let olt_rx_power = 0;
    const chunckSignal = await conn.exec2(`show pon power attenuation gpon-onu_${f_p_s}:${ont_id}`)
    if (chunckSignal && chunckSignal !== '') {
      const [_header0, _header1, _header2, _header3, upSignal, _header4, downSignal] = chunckSignal.split('\r\n')
      
      if (downSignal) {
        tx_power = downSignal.trim().substring(12, 27);
        rx_power = downSignal.trim().substring(33, 47);
      }
      if (upSignal) olt_rx_power = upSignal.trim().substring(12, 27);
    }

    const distance = (item.o_n_u_distance || '-').replace('-', '').replace('m', '')

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
      onu_external_id: item.serialnumber,
      serial_number: item.serialnumber,
      mac_address: str2mac((element.macaddress || '').replace(/\./gi, '')).replace(/\-/gi, ':'),
      description: item.description,
      distance: parseInt(distance !== '' ? distance : '0', 10),
      stage: STATUS[item.phasestate] || 'disabled',
      authorization_at: new Date(), // TODO colocar uma tag de origem importada
      uptime_at: hour2time(item.online_duration),
      custom_fields: {
        source: 'import_onu'
      }
    })
  }*/