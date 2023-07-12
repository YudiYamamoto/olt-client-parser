const { connect } = require('../../../../../config/ssh-connect')
const { dummy2json } = require('../../../../../utils/lib')

/* >>> Coletar os numero de ports
OLT-3008-DATACIT-RET# show olt status
----------------------------------------------------------------
    OLT    |  Status   |  Protect  | Distance | FEC mode(DS/US)
----------------------------------------------------------------
         1 |    Active |           | 20/20 Km |  enable/disable
         2 |    Active |           | 20/20 Km |  enable/disable
         3 |    Active |           | 20/20 Km |  enable/disable
         4 |    Active |           | 20/20 Km |  enable/disable
         5 |    Active |           | 20/20 Km |  enable/disable
         6 |    Active |           | 20/20 Km |  enable/disable
         7 |    Active |           | 20/20 Km |  enable/disable
         8 |    Active |           | 20/20 Km |  enable/disable
OLT-3008-DATACIT-RET#
*/

const displayPons = async (options, { board = '1', slot = '1' }) => {  
  const conn = await connect(options)
  const cmd = `show olt status`  
  const chunk = await conn.exec3(cmd)
  const splitted = chunk.split('\r\n')
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

  return data
    /*
    .filter(item => {
      const [item0] = (item.olt || '').replace(/(EPON)|(GPON)/gi, '').split('/')
      const slot_test = (item0 || item.olt || '').toString()
      return slot_test === slot.toString()
    })
    */
    .map((item) =>  {
      const hasIndex = (item.olt || '').toLowerCase().indexOf('pon') > -1
      const [type_port] = hasIndex ? (item.olt || '').split('pon') : ['G']
      const type_port_default = (`${type_port || 'g'}pon`).toLowerCase()
      const [item0, item1] = (item.olt || '').replace(/(EPON)|(GPON)/gi, '').split('/')
      const new_port = (item1 || item0 || item.olt || '').toString()
      const [min_range, max_range] = (item.distance || '0/0')
        .toLowerCase()
        .replace('km', '')
        .trim()
        .split('/')

      return {
        board,
        slot,
        type: type_port_default,
        port: new_port,
        admin_status: false,
        operational_status: item.status === 'Active' ? 'up' : 'down',
        description: item.olt,
        min_range: parseInt(min_range, 10) * 1000,
        max_range: parseInt(max_range, 10) * 1000,
        scope: [],
        default_for_pon_ports: [],
      }
    })
}

module.exports = displayPons