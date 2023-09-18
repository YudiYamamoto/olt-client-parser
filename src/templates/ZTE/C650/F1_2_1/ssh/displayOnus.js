const displayOnu = require('./displayOnu')

const displayOnus = async (options, params) => {
  const { size: length = 128 } = options && options.__extra__ && options.__extra__.onu || {}
  
  const data = []
  for await (const [index] of Array.from({ length }).entries()) {
    const ont_id = index + 1

    // TODO Verificar
    const onu = await displayOnu(options, { ...params, ont_id })
    if (onu) data.push(onu)
  }
      
  return data
}

module.exports = displayOnus