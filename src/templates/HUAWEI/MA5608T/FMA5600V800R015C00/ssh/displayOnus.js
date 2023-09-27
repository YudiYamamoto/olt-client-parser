const { connect } = require('../../../../../config/ssh-connect')
const { dummy2json, hour2time } = require('../../../../../utils/lib')

// TODO Verificar os dados
const STATUS = {
  'online': 'online',
  'los': 'los',
  'dying-gasp': 'pwr_fail',
}

/*
-----------------------------------------------------------------------------
  F/S/P   ONT         SN         Control     Run      Config   Match    Protect
          ID                     flag        state    state    state    side
  -----------------------------------------------------------------------------
  0/ 2/1    0  4D4F4E55005CED01  active      online   failed   match    no
  0/ 2/1    1  4D4F4E5500D4E019  active      online   failed   match    no
  0/ 2/1    2  4D4F4E5500D4E069  active      online   failed   match    no
  0/ 2/1    3  4D4F4E5500D526A9  active      online   failed   match    no
  0/ 2/1    4  54504C47E55624AD  active      online   normal   match    no
  0/ 2/1    5  485754430514429D  active      online   normal   match    no
  0/ 2/1    6  4D4F4E55005CFF89  active      offline  initial  initial  no
  0/ 2/1    7  48575443AEB8075B  active      online   normal   match    no
  0/ 2/1    8  56534F4C00B21439  active      online   failed   match    no
  0/ 2/1    9  4D4F4E5500D72031  active      online   failed   match    no
  0/ 2/1   10  56534F4C00B203E9  active      online   failed   match    no
  0/ 2/1   11  32303131350361BD  active      online   normal   match    no
  0/ 2/1   12  47504F4E0008EB38  active      online   normal   match    no
  0/ 2/1   13  3230313135038105  active      offline  initial  initial  no
  0/ 2/1   14  323031303502FD4B  active      online   normal   match    no
  0/ 2/1   15  32303130350351CB  active      online   normal   match    no
  0/ 2/1   16  323031313503782B  active      offline  initial  initial  no
  0/ 2/1   17  323031303502FBD7  active      online   normal   match    no

*/

const displayOnus = async (options, params) => {
  const { 
    pon_type: type = 'gpon', 
    board = '0', 
    slot = '2', 
    port = '1',
  } = params
  const cmd = `enable
config
interface ${type} ${board}/${slot}
display ont optical-info ${port} all
quit
display ont info ${board} ${slot} ${port} all
display ont version ${board} ${slot} ${port} all`  
  
  const conn = await connect(options)
  const chunk = await conn.exec7(cmd)

  if (!chunk && chunk === '') return null

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
  splitted.pop()
  splitted.pop()
  splitted.pop()
  
  const indexLast = splitted.findIndex(item => item.trim().indexOf(`display ont info ${board} ${slot} ${port} all`) > -1)
  
  const part1 = splitted.slice(0, indexLast)
  part1.pop()
  part1.pop()
  part1.pop()

  const part2 = splitted.slice(indexLast)
  part2.shift()
  
  const columns = [
    [0, 7],
    [7, 17],
    [17, 27],
    [27, 39],
    [39, 52],
    [52, 61],
    [61, 70],
    [70, 80],
  ]
  const elements = dummy2json(part1.join('\n'), columns, 2).map(item => ({
    board,
    slot,
    port,
    ont_id: item.ont_id,
    // pon_type: 'gpon',
    // capability: 'bridging_routing',
    // allow_custom_profiles: false,
    // catv: false,
    temperature: parseFloat((item['temperature_(_c)'] || '0').toLowerCase().replace('c', '').trim().replace(/ /gi, ''), 10),
    tx_power: parseFloat((item['txpower_(d_bm)'] || '0').toLowerCase().replace('dbm', '').trim().replace(/ /gi, ''), 10),
    rx_power: parseFloat((item['rxpower_(d_bm)'] || '0').toLowerCase().replace('dbm', '').trim().replace(/ /gi, ''), 10),
    olt_rx_power: parseFloat((item['o_l_t_rx_o_n_t_power(d_bm)'] || '0').toLowerCase().replace('dbm', '').trim().replace(/ /gi, ''), 10),
    catv_rx_power: 0,
    distance: parseInt(item['distance_(m)'] || '0', 10),    
    custom_fields: {
      ...item,
    }
  }))

  const columns2_1 = [
    [0, 10],
    [10, 14],
    [14, 32],
    [32, 44],
    [44, 53],
    [53, 62],
    [62, 71],
    [71, 80],
  ]

  const indexModelLast = part2.findIndex(item => item.trim().indexOf(`display ont version ${board} ${slot} ${port} all`) > -1)
  const part2_1 = part2.slice(0, indexModelLast)
  part2_1.pop()
  part2_1.pop()
  part2_1.pop()

  const part2_2 = part2.slice(indexModelLast)
  part2_2.shift()
  part2_2.shift()

  const indexDescriptionLast = part2_1.findIndex(item => item.trim().indexOf('F/S/P   ONT-ID   Description') > -1)
  const part2_1_1 = part2_1.slice(0, indexDescriptionLast)
  const part2_1_2 = part2_1.slice(indexDescriptionLast-1) // DESCRICAO
  part2_1_2.shift()
  part2_1_2.shift()
  part2_1_2.shift()
  part2_1_2.pop()

  const item = []
  let anterior = -1
  part2_1_2.forEach(x => {
    const xy = x.slice(0, 19).trim()
    if (xy !== '') ++anterior
    item[anterior] += x.trim()
  })
  
  const descritions = item.map(item => {
    return {
      ont_id: item.slice(19, 23).trim(),
      description: item.slice(23).trim()
    }
  })

  const data0 = elements.map((item) => {
    const merge = descritions
      .find(item1 => item1.ont_id === item.ont_id)
    return {
      ...item,
      ...merge,
      custom_fields: {
        ...item.custom_fields,
        ...merge.custom_fields,
      }
    }
  })

  const elements2_1 = dummy2json(part2_1_1.join('\n'), columns2_1, 2).map(item => ({
    ont_id: item.ont_id,
    stage: STATUS[item.run_state],
    serial_number: item.sn,
    mac_address: '',
    onu_external_id: '',
    authorization_at: new Date(), 
    custom_fields: {
      ...item,
    }
  }))

  const data1 = data0.map((item) => {
    const merge = elements2_1
      .find(item1 => item1.ont_id === item.ont_id)
    return {
      ...item,
      ...merge,
      custom_fields: {
        ...item.custom_fields,
        ...merge.custom_fields,
      }
    }
  })

  const columns2_2 = [
    [0, 10],
    [10, 16],
    [16, 24],
    [24, 50],
    [50, 68],
    [68, 80]
  ]

  const elements2_2 = dummy2json(part2_2.join('\n'), columns2_2, 2).map(item => ({
    ont_id: item['t-id'],
    onu_type: item.o_n_t_model,
    custom_fields: {
      ...item,
    }
  }))

  const data = data1.map((item) => {
    const merge = elements2_2
      .find(item1 => item1.ont_id === item.ont_id)
    return {
      ...item,
      ...merge,
      custom_fields: {
        ...item.custom_fields,
        ...merge.custom_fields,
        source: 'import_onu',
      }
    }
  })

  return data
}

module.exports = displayOnus