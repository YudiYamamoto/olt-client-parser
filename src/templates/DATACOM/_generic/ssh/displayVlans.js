const { connect } = require('../../../../config/ssh-connect')
const { dummy2json } = require('../../../../utils/lib')


/*
VLAN                                                       TAGGED
ID    NAME                     INTERFACE NAME              UNTAGGED
---------------------------------------------------------------------
10    teste                    gigabit-ethernet-1/1/1      untagged
                               ten-gigabit-ethernet-1/1/2  untagged
100                            ten-gigabit-ethernet-1/1/3  tagged
140   PPPOE-AUTENTIC-EXEMPLO   ten-gigabit-ethernet-1/1/1  tagged
                               ten-gigabit-ethernet-1/1/3  tagged
141   VLAN-AUTENTIC-EXEMPLO-2  ten-gigabit-ethernet-1/1/1  tagged
*/

const displayVlans = async (originalOptions) => {
  const conn = await connect(originalOptions)
  const cmd = 'show running-config dot1q | tab | nomore'
  const chunk = await conn.execDatacom(cmd)

  if (!chunk && chunk === '') return null
  const splitted = chunk.split('\r\n')
  splitted.shift()
  splitted.shift()
	splitted.pop()
  splitted.pop()
	splitted.pop()

  const columns = [
    [0, 6],
    [6, 31],
    [31, 59],
    [59, 70],
  ]

  const data = dummy2json(splitted.join('\n'), columns, 2)

  const list = []
  for (const item of data) {
    list.push({
      vlan_id: item.vlan_id,
      name: item.name,
		})
  }
  return list
}

module.exports = displayVlans