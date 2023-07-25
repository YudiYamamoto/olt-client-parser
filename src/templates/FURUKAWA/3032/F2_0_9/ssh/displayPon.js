const { connect } = require('../../../../../config/ssh-connect')
const { dummy2json } = require('../../../../../utils/lib')

/* >>> Coletar os numero de ports
FKW-AVANZA-3032[A]# show olt status
----------------------------------------------------------------
    OLT    |  Status   |  Protect  | Distance | FEC mode(DS/US)
----------------------------------------------------------------
   GPON1/1 |    Active |           | 20/20 Km |  enable/disable
   GPON1/2 |    Active |           | 20/20 Km |  enable/disable
   GPON1/3 |    Active |           | 20/20 Km |  enable/disable
   GPON1/4 |    Active |           | 20/20 Km |  enable/disable
   GPON1/5 |    Active |           | 20/20 Km |  enable/disable
   GPON1/6 |    Active |           | 20/20 Km |  enable/disable
   GPON1/7 |    Active |           | 20/20 Km |  enable/disable
   GPON1/8 |    Active |           | 20/20 Km |  enable/disable
   GPON1/9 |    Active |           | 20/20 Km |  enable/disable
  GPON1/10 |    Active |           | 20/20 Km |  enable/disable
  GPON1/11 |    Active |           | 20/20 Km |  enable/disable
  GPON1/12 |    Active |           | 20/20 Km |  enable/disable
  GPON1/13 |    Active |           | 20/20 Km |  enable/disable
  GPON1/14 |    Active |           | 20/20 Km |  enable/disable
  GPON1/15 |    Active |           | 20/20 Km |  enable/disable
  GPON1/16 |    Active |           | 20/20 Km |  enable/disable
   GPON2/1 |    Active |           | 20/20 Km |  enable/disable
   GPON2/2 |    Active |           | 20/20 Km |  enable/disable
   GPON2/3 |    Active |           | 20/20 Km |  enable/disable
   GPON2/4 |    Active |           | 20/20 Km |  enable/disable
   GPON2/5 |    Active |           | 20/20 Km |  enable/disable
   GPON2/6 |    Active |           | 20/20 Km |  enable/disable
   GPON2/7 |    Active |           | 20/20 Km |  enable/disable
   GPON2/8 |    Active |           | 20/20 Km |  enable/disable
   GPON2/9 |    Active |           | 20/20 Km |  enable/disable
  GPON2/10 |    Active |           | 20/20 Km |  enable/disable
  GPON2/11 |    Active |           | 20/20 Km |  enable/disable
  GPON2/12 |    Active |           | 20/20 Km |  enable/disable
  GPON2/13 |    Active |           | 20/20 Km |  enable/disable
  GPON2/14 |    Active |           | 20/20 Km |  enable/disable
  GPON2/15 |    Active |           | 20/20 Km |  enable/disable
  GPON2/16 |    Active |           | 20/20 Km |  enable/disable
FKW-AVANZA-3032[A]#
*/


const displayPon = async (options, { board = '1', slot = '1', pon_type: type = 'gpon', port = '1' }) => {  
  const conn = await connect(options)
  const cmd = `show olt status ${type} ${slot}/${port}`  
  
  const chunk = await conn.exec3(cmd)
  const splitted = chunk.split('\r\n')
  splitted.shift()
  splitted.shift()
  splitted.pop()
  
  const columns = [
    [0, 11],
    [12, 23],
    [24, 35],
    [36, 46],
    [47, 64],
  ]

  const chunkMaster = `----------------------------------------------------------------
    OLT    |  Status   |  Protect  | Distance | FEC mode(DS/US) 
----------------------------------------------------------------
${splitted.join('\n')}`

  const data = dummy2json(chunkMaster, columns, 2)

  return data
    .filter(item => {
      const [item0] = (item.olt || '').replace(/(EPON)|(GPON)/gi, '').split('/')
      const slot_test = (item0 || item.olt || '').toString()
      return slot_test === slot.toString()
    })
    .map((item) =>  {
      const hasIndex = (item.olt || '').toLowerCase().indexOf('pon') > -1
      const [type_port] = hasIndex ? (item.olt || '').toLowerCase().split('pon') : ['G']
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

module.exports = displayPon