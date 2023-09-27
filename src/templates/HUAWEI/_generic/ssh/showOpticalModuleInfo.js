const { connect } = require('../../../../config/ssh-connect')
const { dummy2json } = require('../../../../utils/lib')
//const { commandOpticalModuleInfo, generateOpticalModuleInfo } = require('./execOpticalModuleInfo')

/*
 -----------------------------------------------------------------------------
  ONT  Rx power  Tx power  OLT Rx ONT  Temperature  Voltage  Current  Distance
  ID   (dBm)     (dBm)     power(dBm)  (C)          (V)      (mA)     (m)
  -----------------------------------------------------------------------------
    0  -15.90    1.94      -19.47      43           3.280    14       17
  -----------------------------------------------------------------------------           
*/

const showOpticalModuleInfo = async (options, params) => {
  const { 
    pon_type: type = 'gpon', 
    board = '0', 
    slot = '2', 
    port = '1',
  } = params
  const conn = await connect(options)
  const cmd = `enable
  config
  interface ${type} ${board}/${slot}
  display ont optical-info ${port} all`
  const chunk = await conn.exec7(cmd)
  if (!chunk && chunk === '') return null
  const lines = chunk.split('\r\n')

  lines.shift()
  lines.shift()
  lines.shift()
  lines.shift()
  lines.shift()
  lines.shift()
  lines.shift()
  lines.shift()
  lines.shift()
  lines.shift()
  lines.pop()
  lines.pop()

  const columns = [
    [0, 7],
    [7, 17],
    [17, 27],
    [27, 39],
    [39, 52],
    [52, 61],
    [61, 70],
    [70, 79],
  ]
  
  const data = dummy2json(lines.join('\n'), columns, 2)

  // TODO Verificar
  return data.map((item) => ({
    ont_id: item.ont_id, 
    rx_power: item['rxpower_(d_bm)'],
    tx_power: item['txpower_(d_bm)'],
    olt_rx_ont_power_dbm: item['o_l_t_rx_o_n_t_power(d_bm)'],
    temperature_c: item['temperature_(_c)'],
    voltage_v: item['voltage_(_v)'],
    current_ma: item['current_(m_a)'],
    distance_m: item['distance_(m)'],
    custom_fields: {
      ...item,
    }
  }))
}

module.exports = showOpticalModuleInfo
