const { dummy2json } = require('../../../../utils/lib')

const scopeVlanInternet = async (_originalOptions) => {
  const chunk = `IRARA-OLT#show ip dhcp snooping vlan 666
DHCP snooping state on vlans
Vlan     State
-------------------------------
666     enable
IRARA-OLT#`
  const chunks = chunk.split('\n')
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