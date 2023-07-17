const displayOnus = require('./displayOnus')

const displayOnu = async (options, { ont_id = '1', ...params }) => {
  const data = await displayOnus(options, params)
  return data && data.find(onu => onu.ont_id === ont_id)
}

module.exports = displayOnu