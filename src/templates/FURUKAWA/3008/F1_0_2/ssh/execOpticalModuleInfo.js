const { line2json } = require('../../../../../utils/lib')
const commandOpticalModuleInfo = (_type, _slot, port, ont_id) => `show onu ani optic-module-info ${port} ${ont_id}`

const generateOpticalModuleInfo = (lines) => {
  const column = line2json(lines, 100)

  const data = {}
  Object
    .keys(column)
    .forEach((item) => { 
      const [value] = column[item].split('(Alarm')
      return data[item] = parseFloat((value || '').toLowerCase().replace(/[ ,a-z]/gi, ''))
    })

  return {
    temperature: data['d_m_i_temperature'] || 0,
    tx_power: data['d_m_i_txpower'] || 0,
    olt_rx_power: data['d_m_i_rxpower'] || 0,
    custom_fields: data
  }
}

module.exports = { 
  commandOpticalModuleInfo,
  generateOpticalModuleInfo,
}