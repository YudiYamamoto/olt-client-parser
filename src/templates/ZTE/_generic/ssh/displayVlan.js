const { connect } = require('../../../../config/ssh-connect')
const { column2json } = require('../../../../utils/lib')

/*
IRARA-OLT#show vlan 1
vlanid          :1
name            :VLAN0001
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
IRARA-OLT#
*/

const displayVlan = async (options, vlan) => {
  const conn = await connect(options)
  const cmd = `show vlan ${vlan}`
  const chunk = await conn.exec2(cmd)

  const splitted = chunk.split('\r\n')
  splitted.shift()
  splitted.shift()
  splitted.pop()
  
  if (splitted.length === 0) return null;

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
