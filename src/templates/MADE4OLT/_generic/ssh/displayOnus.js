const displayOnu = require('./displayOnu')
const chance = require('chance').Chance()

const displayOnus = async (options, params) => {
  const { onus_count = 0 } = (params && params.custom_fields) || {}
  const { size = 128 } = (options && options.__extra__ && options.__extra__.onu) || {}
  
  const data = []  
  if (onus_count === 0) {
    const length = chance.integer({ min: 0, max: size })
    for await (const [index] of Array.from({ length }).entries()) {
      const ont_id = index + 1
      const onu = await displayOnu(options, { ...params, ont_id })
      if (onu) data.push(onu)
    }
  }      
  return data
}

module.exports = displayOnus