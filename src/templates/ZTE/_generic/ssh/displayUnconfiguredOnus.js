const { connect } = require('../../../../config/ssh-connect')
const { dummy2json } = require('../../../../utils/lib')

/*
177.128.98.246: terminal length 512
IRARA-OLT#show pon onu uncfg
OltIndex            Model                SN                 PW
-------------------------------------------------------------------------
gpon-olt_1/1/1      XZ000-G3             TPLGB1A15691       N/A
IRARA-OLT#
*/

const displayUnconfiguredOnus = async (originalOptions) => {
  const conn = await connect(originalOptions)
  const cmd = `terminal length 512
show pon onu uncfg`
  const chunk = await conn.exec2(cmd)

  console.log(cmd, chunk);
  
  const splitted = chunk.split('\n')
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.pop()

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