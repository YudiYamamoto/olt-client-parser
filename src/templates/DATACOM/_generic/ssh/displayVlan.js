const { connect } = require('../../../../config/ssh-connect')
const { dummy2json } = require('../../../../utils/lib')

	/*
VLAN                                     TAGGED
ID    NAME   INTERFACE NAME              UNTAGGED
---------------------------------------------------
10    teste  gigabit-ethernet-1/1/1      untagged
            ten-gigabit-ethernet-1/1/2  untagged
	*/

const displayVlan = async (options, vlan) => {
  const conn = await connect(options)
  const cmd = `show running-config dot1q vlan ${vlan} | tab | nomore`
  const chunk = await conn.execDatacom(cmd)

  const splitted = chunk.split('\r\n')
  splitted.shift()
  splitted.pop()
  splitted.pop()
  splitted.pop()
  splitted.pop()
  
  const columns = [
    [0, 6],
    [6, 30],
    [30, 58],
    [58, 80],
  ]

  const data = dummy2json(splitted.join('\n'), columns, 2)
  return data
    .map(item => ({
      name: item.vlan_id || '',
      description: item.name || '',
      custom_fields: {
        ...item
      }
    }))
    .filter(item => item.name !== '')
}

module.exports = displayVlan