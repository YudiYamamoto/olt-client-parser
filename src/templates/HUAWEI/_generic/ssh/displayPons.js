const { connect } = require('../../../../config/ssh-connect')
const { dummy2json } = require('../../../../utils/lib')

/*
  -------------------------------------------------------------
    Port   Port   min-distance   max-distance   Optical-module
           type       (km)           (km)           status
  -------------------------------------------------------------
    0     GPON        0              20             Online
    1     GPON        0              20             Online
    2     GPON        0              20             Online
    3     GPON        0              20             Online
    4     GPON        0              20             Online
    5     GPON        0              20             Online
    6     GPON        0              20             Online
    7     GPON        0              20             Online
  -------------------------------------------------------------
*/

//TODO Verificar
const displayPons = async (options, { board, slot }) => {
  const cmd = `scroll 512
display board ${board}/${slot}}`
  const conn = await connect(options)
  const chunk = await conn.exec7(cmd)
  if (!chunk && chunk === '') return null
  
  const splitted = chunk.split('\r\n')
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.pop()

  const columns = [
    [0, 10],
    [12, 23],
    [24, 35],
    [36, 46],
    [48, 64],
  ]
  
  const data = dummy2json(splitted.join('\n'), columns, 2)
  let min_range = '0'
  const max_range = String(min_range || '')

  return data
    .map((item) =>  {
      const hasIndex = (item.olt || '').toLowerCase().indexOf('pon') > -1
      const [type_port] = hasIndex ? (item.olt || '').split('pon') : ['G']
      const type_port_default = (`${type_port || 'g'}pon`).toLowerCase()
        .toLowerCase()
        .replace('km', '')
        .trim()
        .split('/')

      return {
      type: type_port_default,
      min_range: 0,
      max_range: parseInt(max_range, 10) * 1000,
      operational_status: item.status === 'Online' ? 'Online' : 'Offline',
      description: '',
      }
    })
}

module.exports = displayPons