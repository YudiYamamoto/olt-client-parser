const { connect } = require('../../../../config/ssh-connect')

/*
Physical interface   :  gpon 1/1/10, Disabled, Physical link is Down
Link-level type      :  GPON
Logical reach        :  0-40 km
Downstream FEC       :  Enabled
Upstream FEC         :  Enabled
Transceiver type     :  sps-43-48h-hp-cde
Allocated upstream bandwidth
    Fixed + Assured  :  0          kbit/s
    Fixed            :  0          kbit/s
    Assured          :  0          kbit/s
    Max              :  0          kbit/s
    Overhead         :  0          kbit/s (0 ONUs)
Available upstream bandwidth
    CBR   BW         :  0          kbit/s
    Total BW         :  0          kbit/s
*/

const displayPons = async (options, { board = '1' , slot = '1' }) => {
  const cmd = 'show interface gpon | nomore'
  const conn = await connect(options)
  const chunk = await conn.execDatacom(cmd)
  if (!chunk || chunk === '') return null

  const splitted = chunk.split('\r\n')
  splitted.shift()
  splitted.pop()

  const ponGroup = []
  let pon = {}

  for (const line of splitted) {
    if (line.trim() === '') {
      if (Object.keys(pon).length > 0) {
        ponGroup.push(pon)
        pon = {}
      }
    } else {
      const parts = line.split(':')
      if (parts.length === 2) {
        const key = parts[0].trim()
        const value = parts[1].trim()
        pon[key] = value
      }
    }
  }

  if (Object.keys(pon).length > 0) {
    ponGroup.push(pon)
  }

  return ponGroup.map((item) => {
    const [physicalInterfaceParts0, physicalInterfaceParts1, physicalInterfaceParts2] = item['Physical interface'].split(',')
    const board = physicalInterfaceParts0.split('/')[0].split(' ')[1]
    const slot = physicalInterfaceParts0.split('/')[1]
    const type = item['Link-level type'].toLowerCase()
    const port = physicalInterfaceParts0.split('/')[2] || ''
    const admin_status = physicalInterfaceParts1.trim().toLowerCase().indexOf('disabled') <= -1
    const operational_status = physicalInterfaceParts2.trim().toLowerCase().indexOf('down') > -1
    
    const [min_range, max_range] = item['Logical reach'].trim().toLowerCase().replace('km', '').split('-')
    
    return {
      board,
      slot,
      port,
      type,
      admin_status,
      operational_status: operational_status ? 'down' : 'up',
      description: '',
      min_range: parseInt(min_range, 10) * 1000,
      max_range: parseInt(max_range, 10) * 1000,
      scope: [],
      default_for_pon_ports: [],
      custom_fields: { 
        ...item
      }
    }
  })
  .filter((item) => item.board === board && item.slot === slot)
}

module.exports = displayPons
