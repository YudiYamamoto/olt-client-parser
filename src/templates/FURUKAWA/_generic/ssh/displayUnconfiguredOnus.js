const { connect } = require('../../../../config/ssh-connect')
const { dummy2json } = require('../../../../utils/lib')

/*
----------------------------------------------------------------------------------
 OLT | ONU | STATUS | MODE | Serial No. | Password(R-ID) | Link uptime
-------------------------------------------------------------------------------------
 1 | 1 | Active | auto | FISA4b09a034 | 00000000000000000000 | 0:00:01:27
 1 | 3 | Active | auto | FRKW826f72ec | 20202020202020202020 | 0:00:01:26
 1 | 4 | Active | auto | FRKW4bf30c9e | 00000000000000000000 | 0:00:01:26
 1 | 5 | Active | auto | FRKW8e97df00 | 00000000000000000000 | 0:00:01:26
 1 | 6 | Active | auto | FRKW4bf7a600 | 00000000000000000000 | 0:00:01:26
 1 | 7 | Active | auto | FRKW82091123 | 20202020202020202020 | 0:00:01:26
 1 | 8 | Active | auto | FRKW5a010001 | 00000000000000000000 | 0:00:01:25
 1 | 10 | Active | auto | FRKW82010001 | 20202020202020202020 | 0:00:01:25
 1 | 11 | Active | auto | FRKW826f72f7 | 20202020202020202020 | 0:00:01:25
 1 | 12 | Active | auto | FRKW826f7268 | 20202020202020202020 | 0:00:01:25
 1 | 14 | Active | auto | FRKW80103312 | 20202020202020202020 | 0:00:01:24
 1 | 15 | Active | auto | FRKW826f730d | 20202020202020202020 | 0:00:01:24
 1 | 16 | Active | auto | FRKW4b0067d3 | 00000000000000000000 | 0:00:01:24
*/

const displayUnconfiguredOnus = async (originalOptions) => {
  const conn = await connect(originalOptions)
  const cmd = 'show onu unprovisioned'
  const chunk = await conn.exec3(cmd)
  
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