const { line2json } = require('../../../../../utils/lib')
const commandOpticalModuleInfo = (type, slot, port, ont_id) => `show onu ani optic-module-info ${type} ${slot}/${port} ${ont_id}`

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
    temperature: data['d_m_i_temperature'],
    tx_power: data['d_m_i_txpower'],
    olt_rx_power: data['d_m_i_rxpower'],
    custom_fields: data
  }
}

module.exports = { 
  commandOpticalModuleInfo,
  generateOpticalModuleInfo,
}