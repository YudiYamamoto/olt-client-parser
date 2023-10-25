const displayOnu = require('./displayOnu')
const chance = require('chance').Chance()

const displayOnus = async (options, params) => {
  const { board = '1', slot = '1', port = '1' } = params || {};
  // const { onus_count = 0 } = (params && params.custom_fields) || {}
  const { size = 99 } = (options && options.__extra__ && options.__extra__.onu) || {}

  const data = []  
  const length = chance.integer({ min: 0, max: size })
  for await (const [index] of Array.from({ length }).entries()) {
    const ont_id = index + 1
    const mac_address = `FF:${board.padStart(2, '0')}:${slot.padStart(2, '0')}:${(port || '').padStart(2, '0')}:MM:${ont_id.toString().padStart(2, '0')}`
    const onu = await displayOnu(options, { ...params, ont_id, mac_address })
    if (onu) data.push(onu)
  }      
  return data
}

module.exports = displayOnus