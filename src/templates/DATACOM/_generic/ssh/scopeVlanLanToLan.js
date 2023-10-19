const { connect } = require('../../../../config/ssh-connect')
const { dummy2json } = require('../../../../utils/lib')

/*
VID  TYPE  BROADCAST  MULTICAST  UNICAST
------------------------------------------
10   1:1   -          -          -
100  tls   -          -          -
140  n:1   -          -          -
141  n:1   -          -          -
*/

const scopeVlanLanToLan = async (options) => {
const cmd = 'show running-config service | tab | nomore'
const conn = await connect(options)
const chunk = await conn.execDatacom(cmd)
if (!chunk && chunk === '') return null

const splitted = chunk.split('\r\n')
splitted.shift()
splitted.pop()
splitted.pop()

const columns = [
  [0, 5],
  [5, 11],
  [11, 22],
  [22, 33],
  [33, 44],
]

const data = dummy2json(splitted.join('\n'), columns, 1)

return data
}

module.exports = scopeVlanLanToLan