const displayOnus = require('./displayOnus')

//TODO arrumar o retorno dos dados, está faltando alguns campos -> olhar na planilha -> 18/10/2023
const displayOnu = async (options, { ont_id, ...params }) => {
    const data = await displayOnus(options, params)
    if (!data) return null
    return data.find(item => item.ont_id === ont_id)
}

module.exports = displayOnu