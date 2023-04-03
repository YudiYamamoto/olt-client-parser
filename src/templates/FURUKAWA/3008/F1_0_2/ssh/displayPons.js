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


const displayPons = async (_options, { board = '1', slot = '1' }) => {  
  /*
  const conn = await connect(options)
  const cmd = `show olt status`  
  // const chunk = await conn.exec(cmd)
  */

  const chunk = `----------------------------------------------------------------
  OLT    |  Status   |  Protect  | Distance | FEC mode(DS/US)
----------------------------------------------------------------
       1 |    Active |           | 20/20 Km |  enable/disable
       2 |    Active |           | 20/20 Km |  enable/disable
       3 |    Active |           | 20/20 Km |  enable/disable
       4 |    Active |           | 20/20 Km |  enable/disable
       5 |    Active |           | 20/20 Km |  enable/disable
       6 |    Active |           | 20/20 Km |  enable/disable
       7 |    Active |           | 20/20 Km |  enable/disable
       8 |    Active |           | 20/20 Km |  enable/disable`

  const columns = [
    [0, 9],
    [10, 21],
    [22, 33],
    [34, 44],
    [45, 64],
  ]

  const data = dummy2json(chunk, columns, 2)

  return data.map((item) =>  {
    const [min_range, max_range] = (item.distance || '0/0')
      .toLowerCase()
      .replace('km', '')
      .trim()
      .split('/')

    return {
      board,
      slot,
      type: 'gpon',
      port: item.olt,
      admin_status: false,
      operational_status: item.status === 'Active' ? 'up' : 'down',
      description: '',
      min_range: parseInt(min_range, 10) * 1000,
      max_range: parseInt(max_range, 10) * 1000,
      scope: [],
      default_for_pon_ports: [],
    }
  })
}

module.exports = displayPons