const { dummy2json } = require('../../../../utils/lib')
const chance = require('chance').Chance()


const displayUnconfiguredOnus = async (_originalOptions) => {
  const board = 1
  const type =  chance.bool({ likelihood: 80 }) ? 'gpon' : 'epon'
  const slot = chance.integer({ min: 1, max: 4 })
  const port = chance.integer({ min: 1, max: 16 })
  const randomOnuType = () => `MD000-${(type[0]).toUpperCase()}${chance.integer({ min: 1, max: '4' })}`
  const randomSerialNumber = () => `MB${board}S${slot}R${type.toUpperCase()}${port.padStart(2, '0')}`

  const chunk = `177.128.98.246: terminal length 512
IRARA-OLT#show pon onu uncfg
OltIndex            Model                SN                 PW
-------------------------------------------------------------------------
${type}-olt_${board}/${slot}/${(port).toString().padEnd(2, ' ')}     ${randomOnuType()}             ${randomSerialNumber()}       N/A
IRARA-OLT#`
  const splitted = chunk.split('\n')
  splitted.pop()
  splitted.shift()
  splitted.shift()

  const columns = [
    [0, 20],
    [20, 41],
    [41, 60],
    [60, 74],
  ]

  const elements = dummy2json(splitted.join('\n'), columns, 1)
  return elements.map((item) => {
    const [pon_type, rest] = item.olt_index.split('-')
    const [_, physical] = rest.split('_')
    const [board, slot, port] = physical.split('/')
    return {
      pon_type,
      board,
      slot,
      port,
      onu_type: item.model,
      serial_number: item.sn,
      description: item.pw,
      authorization_at: null,
    }
  })
}

module.exports = displayUnconfiguredOnus