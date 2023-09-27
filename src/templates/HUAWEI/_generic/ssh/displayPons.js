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
    8     GPON        0              20             Online
    9     GPON        0              20             Online
   10     GPON        0              20             Online
   11     GPON        0              20             Online
   12     GPON        0              20             Online
   13     GPON        0              20             Online
   14     GPON        0              20             Online
   15     GPON        0              20             Online
  -------------------------------------------------------------

*/

function sliceLastIndex(arr, val) {
  const indexes = []
  arr.forEach((element, index) => {
    if (element.trim() === val) {
      indexes.push(index)
    }
  })
  const [lastIndex] = indexes.reverse()
  return arr.slice(0, lastIndex)
}

//TODO Verificar
const displayPons = async (options, { board, slot }) => {
  const cmd = `scroll 512
display board ${board}/${slot}`
  const conn = await connect(options)
  const chunk = await conn.exec7(cmd)
  if (!chunk && chunk === '') return null
  if (chunk.indexOf('min-distance') <= -1) return null
  
  const splitted = chunk.split('\r\n')
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.pop()

  const splittedFilterd = sliceLastIndex(splitted, '-------------------------------------------------------------')

  const columns = [
    [0, 8],
    [8, 16],
    [16, 31],
    [31, 46],
    [46, 64],
  ]
  
  const data = dummy2json(splittedFilterd.join('\n'), columns, 2)

  return data
    .map((item) =>  {      
      return {
        board,
        slot,
        type: (item.port_type || '').toLowerCase(),
        port: item.port,
        admin_status: false,
        operational_status: item['optical-module_status'] === 'Online' ? 'up' : 'down',
        description: '',
        min_range: parseInt(item['min-distance_(km)'], 10) * 1000,
        max_range: parseInt(item['max-distance_(km)'], 10) * 1000,
        scope: [],
        default_for_pon_ports: [],
        custom_fields: {
          ...item
        }
      }
    })
}

module.exports = displayPons