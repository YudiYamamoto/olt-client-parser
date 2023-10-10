const displayOnu = async (options,  params) => {
  const { ont_id = '1' } = params
  const data = await displayOnus(options, params)
  return data && data.find(item => item.ont_id === ont_id)
}

module.exports = displayOnu