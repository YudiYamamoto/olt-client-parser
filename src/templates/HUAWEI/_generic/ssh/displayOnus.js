const { connect } = require('../../../../config/ssh-connect')
const { dummy2json, hour2time } = require('../../../../utils/lib')


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
display ont info summary ${port}`
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
  
  const indexLast = splitted.findIndex(item => item.trim().indexOf('display ont info summary') > -1)

  const part1 = splitted.slice(0, indexLast)
  part1.pop()
  part1.pop()
  part1.pop()

  const part2 = splitted.slice(indexLast)
  part2.shift()
  part2.shift()
  part2.shift()
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

  const indexNextLevel = part2.findIndex(item => item.trim().indexOf('Rx/Tx power') > -1)

  const part2_1 = part2.slice(0, indexNextLevel-1)
  const columns2_1 = [
    [0, 7],
    [7, 15],
    [15, 35],
    [35, 55],
    [55, 80],
  ]
  const elements2_1 = dummy2json(part2_1.join('\n'), columns2_1, 2).map(item => ({
    ont_id: item.ont_id,
    stage: STATUS[item.run__state],
    uptime_at: hour2time(item.last__up_time),
    custom_fields: {
      ...item,
    }
  }))

  const data0 = elements.map((item) => {
    const merge = elements2_1
      .find(item1 => item1.ont_id === item.ont_id)
    return {
      ...item,
      ...merge,
      custom_fields: {
        ...item && item.custom_fields,
        ...merge && merge.custom_fields,
      }
    }
  })

  const part2_2 = part2.slice(indexNextLevel-1)
  const columns2_2 = [
    [0, 6],
    [6, 23],
    [23, 37],
    [37, 46],
    [46, 59],
    [59, 80],
  ]
  const elements2_2 = dummy2json(part2_2.join('\n'), columns2_2, 2).map(item => ({
    ont_id: item.ont_id,
    serial_number: item.sn,
    onu_type: item.type,
    description: item.description,
    // TODO validar como colocar a info correta
    name: '',
    mac_address: '',
    onu_external_id: '',
    authorization_at: new Date(), 
    custom_fields: {
      ...item,
    }
  }))

  const data = data0.map((item) => {
    const merge = elements2_2
      .find(item1 => item1.ont_id === item.ont_id)
    return {
      ...item,
      ...merge,
      custom_fields: {
        ...item && item.custom_fields,
        ...merge && merge.custom_fields,
        source: 'import_onu',
      }
    }
  })

  return data
}

module.exports = displayOnus