const displayOnus = require('./displayOnus')

const displayOnu = async (options, { ont_id, ...params }) => {
  const data = await displayOnus(options, params)
  if (!data) return null
  return data.find(item => item.ont_id === ont_id)
}

module.exports = displayOnu