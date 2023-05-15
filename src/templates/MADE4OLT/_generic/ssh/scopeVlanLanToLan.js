const { dummy2json } = require('../../../../utils/lib')

const scopeVlanLanToLan = async (_originalOptions) => {
  const chunk = `IRARA-OLT#show security user-communication
user-communication item:
Svlan    Cvlan 
-------------
667      0
2201     0
IRARA-OLT#`
  const chunks = chunk.split('\n')
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