const { column2json } = require('../../../../utils/lib')

const displayVlan = async (_options, vlan) => {
  const chunk = `IRARA-OLT#show vlan ${vlan}
vlanid          :${vlan}
name            :VLAN${vlan}
description     :N/A
multicast-packet:flood-unknown
protocol-filter :N/A
cos-to-dei      :N/A
dei-mark        :disable
tpid            :N/A
forwarding-mode :vlan-mac
status          :OK
cos copy-to-inner :N/A
cos copy-to-outer :N/A
port(untagged):
port(tagged):
IRARA-OLT#`

  const splitted = chunk.split('\n')
  splitted.shift()
  splitted.shift()
  splitted.pop()
  
  if (splitted.length === 0) return null

  const item = column2json(
    splitted
    .map(item2 => 
      item2
        .replace(':', '[$%]')
        .replace(/\:/gi, '-')
        .replace('[$%]', ':')
      )
    .splice(1))
  
  const data = { 
    name: vlan, 
    description: item.description,
    custom_fields: {
      ...item
    }
  }
  return data
}

module.exports = displayVlan
