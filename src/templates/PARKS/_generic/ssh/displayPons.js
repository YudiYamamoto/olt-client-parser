const { connect } = require('../../../../config/ssh-connect')
const { dummy2json, CR, LF } = require('../../../../utils/lib')
const { INTERFACE_SPLIT, splitResponse, km2meters } = require('../../../../utils/parks')

/*
PARKS# show interface description
Interface               Status  Protocol  Description
10giga-ethernet0/0      up      unknown
10giga-ethernet0/1      up      unknown
giga-ethernet0/0        up      unknown
giga-ethernet0/1        up      unknown   UPLINK
giga-ethernet0/2        up      unknown
giga-ethernet0/3        up      unknown
giga-ethernet0/4        up      unknown
giga-ethernet0/5        up      unknown
giga-ethernet0/6        up      unknown
giga-ethernet0/7        up      unknown
gpon1/1                 up      unknown
gpon1/2                 up      unknown
gpon1/3                 up      unknown
gpon1/4                 up      unknown
gpon1/5                 up      unknown
gpon1/6                 up      unknown
gpon1/7                 up      unknown
gpon1/8                 up      unknown
loopback0               up      unknown
mgmt                    up      unknown
mgmt1                   up      unknown
mgmt1.100               up      unknown
mgmt1.4020              up      unknown
*/

module.exports = async (options, { board = '0', slot = '0' }) => {
  const chunks = await (await connect(options)).execParks('show interface description')

  if (!chunks) return null

  const splitted = splitResponse(chunks, line_feed=CR)
  splitted.shift() // remove: PARKS#show interface description

  const columns = [
    [0, 24],  // interface
    [24, 32], // status
    [32, 42], // protocol
    [42, 53], // description
  ]

  const data = dummy2json(splitted.join(LF), columns, 1)
  const pons = data
    .map(item => {
      const interface = item && item.interface.match(INTERFACE_SPLIT).groups
      if (interface.type.indexOf('pon') <= -1) return null
      const status = (item.status || '').indexOf('up')

      return {
        board, 
        slot: interface.slot || '0',
        port: interface.port || '0',
        admin_status: status > -1,
        operational_status: status > -1 ? 'up' : 'down',
        description: '',
        min_range: 0,
        max_range: 20 * 1000,
        scope: [],
        default_for_pon_ports: [],
        custom_fields: {
          ...item,
          ...interface,
        }
      }
    })
    .filter(item => !!item)
    .filter(item => item.slot === slot)

  const commands = []
  for await (const pon of pons) {
    const { port, custom_fields } = pon
    const { type: pon_type } = custom_fields || {}
    commands.push(`show interface ${pon_type}${slot}/${port} link information`)
  }

  const datas = await (await connect(options)).execParks(commands)
  if (!datas) return null

  const response = []
  const max_instructions = datas
    .split('\r\n')
    .filter(item => item.indexOf('Max Logical Distance') > -1)
    .map(item => item.replace('Max Logical Distance: ', ''))
  const min_instructions = datas
    .split('\r\n')
    .filter(item => item.indexOf('Min Logical Distance') > -1)
    .map(item => item.replace('Min Logical Distance: ', ''))
  for await (const [index, pon] of pons.entries()) {
    const max_link = max_instructions[index]
    const min_link = min_instructions[index]
    response.push({ 
      ...pon, 
      min_range: km2meters(min_link),
      max_range: km2meters(max_link),
    })
  }

  return response
}
