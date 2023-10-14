const displayPons = require('./displayPons')

//TODO Verificar
const displayPon = async (options, { port, ...params }) => {
  const data = await displayPons(options, params)
  if (!data) return null
  return data.find(item => parseInt(item.port, 10) === parseInt(port, 10))
}

module.exports = displayPon