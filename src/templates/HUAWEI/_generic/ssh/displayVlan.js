const { connect } = require('../../../../config/ssh-connect')
const { column2json } = require('../../../../utils/lib')

/*
  VLAN ID: 2573
  VLAN name: ADM-INBAND
  VLAN type: standard
  VLAN attribute: common
  VLAN description:
  VLAN forwarding mode in control board: VLAN-MAC
  VLAN forwarding mode: VLAN-MAC
  VLAN broadcast packet forwarding policy: forward
  VLAN unknown multicast packet forwarding policy: forward
  VLAN unknown unicast packet forwarding policy: forward
  VLAN bind service profile ID: -
  VLAN bind RAIO profile index: -
  VLAN priority: -
  Standard port number: 0
  Service virtual port number: 0
*/

const displayVlan = async (options, vlan) => {
  const conn = await connect(options)
  const cmd = `enable
display vlan ${vlan}
  `
  const chunk = await conn.exec7(cmd)

  const splitted = chunk.split('\r\n')
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.pop()
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
    description: item.v_l_a_nname || '',
    custom_fields: {
      ...item
    }
  }
  return data
}

module.exports = displayVlan