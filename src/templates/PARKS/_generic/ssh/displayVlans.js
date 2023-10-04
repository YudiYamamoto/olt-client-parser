const { connect } = require('../../../../config/ssh-connect')
const { dummy2json } = require('../../../../utils/lib')

/*
PARKS# show vlan 
Existing VLANs:  vlan1, vlan100, vlan1000-vlan1100, vlan4020, vlan4094
*/

const displayVlans = async (options) => {
  const cmd = `show vlan`
  const conn = await connect(options)
  const chunk = await conn.execParks(cmd)
  if (!chunk && chunk === '') return null

  const splitted = chunk.split('\r\n')
  splitted.shift() // remove: 10.12.13.2: terminal length 0
  splitted.shift() // remove: PARKS#show vlan
  splitted.pop()   // remove: PARKS#

  console.log(splitted);
  // TODO: cortar as vlans
  // const data = dummy2json(splitted.join('\n'), columns, 2)

  return {};
}

module.exports = displayVlans