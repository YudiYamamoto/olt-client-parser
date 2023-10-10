const { connect } = require('../../../../config/ssh-connect')
const { dummy2json, hour2time } = require('../../../../utils/lib')


// TODO Verificar os dados
const STATUS = {
  'online': 'online',
  'los': 'los',
  'dying-gasp': 'pwr_fail',
  'offline': 'disabled'
}

/*
MA5603T(config-if-gpon-0/3)#display ont info summary 10
Command is being executed. Please wait
------------------------------------------------------------------------------
In port 0/3/10, the total of ONTs are: 5, online: 5
------------------------------------------------------------------------------
ONT  Run     Last                Last                Last
ID   State   UpTime              DownTime            DownCause
------------------------------------------------------------------------------
0    online  28/09/2023 15:43:18 28/09/2023 15:42:18 dying-gasp
1    online  27/09/2023 19:27:05 27/09/2023 18:21:51 dying-gasp
2    online  27/09/2023 18:48:53 27/09/2023 18:01:40 dying-gasp
3    online  27/09/2023 18:20:23 27/09/2023 18:18:18 dying-gasp
4    online  27/09/2023 18:20:23 27/09/2023 18:18:04 dying-gasp
------------------------------------------------------------------------------
ONT        SN        Type          Distance Rx/Tx power  Description
ID                                    (m)      (dBm)
------------------------------------------------------------------------------
0   48575443AA7F1D38 310M             2867  -23.87/1.98  alexandrenetofibra
1   48575443847A874E 310M             2982  -26.99/2.20  calcadossocorrensepom
2   485754439B5A0D4E 310M             2720  -23.37/1.96  giovaniolianifibra
3   48575443D578D64E 310M             2799  -24.81/2.21  larissahelenafibra
4   4857544342382B4E 310M             2514  -25.85/2.20  michelecristianesilve
------------------------------------------------------------------------------

*/

const displayOnus = async (options, params) => {
  const { 
    pon_type: type = 'gpon', 
    board = '0', 
    slot = '2', 
    port = '1',
  } = params
  const cmd = `enable
scroll 512
config
interface ${type} ${board}/${slot}
display ont optical-info ${port} all
quit
display ont info summary ${board}/${slot}/${port}`
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

  const part2_2 = part2.slice(indexNextLevel-1).map(item => item.trim())
  const columns2_2 = [
    [0, 4],
    [4, 21],
    [21, 35],
    [35, 44],
    [44, 57],
    [57, 80],
  ]

  const test = dummy2json(part2_2.join('\n'), columns2_2, 2)

  const elements2_2 = test.map(item => ({
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