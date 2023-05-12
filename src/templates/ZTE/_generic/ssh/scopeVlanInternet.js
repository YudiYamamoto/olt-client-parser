const { connect } = require('../../../../config/ssh-connect')
const { dummy2json } = require('../../../../utils/lib')

/*
IRARA-OLT#show ip dhcp snooping vlan 666
DHCP snooping state on vlans
Vlan     State
-------------------------------
666     enable
IRARA-OLT#
*/

const scopeVlanInternet = async (originalOptions) => {
  const conn = await connect(originalOptions)
  const cmd = 'show ip dhcp snooping vlan'
  const chunk = await conn.exec2(cmd)
  const chunks = chunk.split('\r\n')
  // chunks.shift()
  chunks.shift()
  chunks.shift()
  chunks.pop()

  const columns = [
    [0, 8],
    [8, 31],
  ]

  const data = dummy2json(chunks.join('\n'), columns, 0)
  return data
}

module.exports = scopeVlanInternet