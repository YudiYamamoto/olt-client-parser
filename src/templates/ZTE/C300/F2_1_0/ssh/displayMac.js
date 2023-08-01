const { connect } = require('../../../../../config/ssh-connect')
const { dummy2json, str2mac } = require('../../../../../utils/lib')

const generateCommmand = (type, f_p_s, ont_id) => `show mac ${type} onu ${type}-onu_${f_p_s}:${ont_id}`

const runCommand = (chunkMA) => {
  let element = {}
  if (chunkMA && chunkMA !== '') {
    const [_line1, _line2, _line3, _line4, ...splitted1] = chunkMA.split('\r\n')
    const columns = [
      [0, 17],
      [17, 23],
      [23, 33],
      [33, 58],
      [58, 79],
    ]
    splitted1.pop()
    const elements = dummy2json(splitted1.join('\n'), columns, 1)
    element = elements[0] || {}
  }
  
  const mac_address = String((element && element.macaddress) || element || '').replace(/\./gi, '')

  return { 
    mac_address: (str2mac(mac_address) || '').replace(/\-/gi, ':')
  }
}

const displayMac = async (options, { 
  pon_type: type = 'gpon', 
  board = '1', 
  slot = '1', 
  port = '1',
  ont_id = '1' 
}) => {
  const conn = await connect(options)
  const f_p_s = `${board}/${slot}/${port}`
  const cmd2 = generateCommmand(type, f_p_s, ont_id)
  const chunkMA = await conn.exec2(cmd2)
  return runCommand(chunkMA)
}

module.exports = {
  generateCommmand,
  runCommand,
  displayMac,
}