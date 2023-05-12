const { connect } = require('../../../../config/ssh-connect')
const { dummy2json } = require('../../../../utils/lib')

/*
IRARA-OLT#show security user-communication
user-communication item:
Svlan    Cvlan 
-------------
667      0
2201     0
IRARA-OLT#
*/

const scopeVlanLanToLan = async (originalOptions) => {
  const conn = await connect(originalOptions)
  const cmd = 'show security user-communication'
  const chunk = await conn.exec2(cmd)
  const chunks = chunk.split('\r\n')
  chunks.shift()
  chunks.shift()
  chunks.shift()
  chunks.pop()

  const columns = [
    [0, 9],
    [9, 14],
  ]

  const data = dummy2json(chunks.join('\n'), columns, 0)
  return data
}

module.exports = scopeVlanLanToLan