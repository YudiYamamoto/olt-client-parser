const { connect } = require('../../../../config/ssh-connect')
const { dummy2json } = require('../../../../utils/lib')

/*
  -------------------------------
   F /S /P     Native VLAN  State
  -------------------------------
   0 /2 /0               1  down
   0 /2 /1               1  down
   0 /2 /2               1  down
   0 /2 /3               1  down
  -------------------------------
*/

const displayVlans = async (originalOptions, vlan) => {
  const conn = await connect(originalOptions)
  const cmd = `enable
	display vlan ${vlan}`
  const chunk = await conn.exec7(cmd)
  if (!chunk && chunk === '') return null
  const splitted = chunk.split('\r\n')

  splitted.shift()
  splitted.shift()
  splitted.shift()
	splitted.shift()
	splitted.shift()
	splitted.shift()
  splitted.shift()
  splitted.shift()
	splitted.shift()
	splitted.shift()
	splitted.shift()
  splitted.shift()
	splitted.shift()
  splitted.shift()
  splitted.shift()
	splitted.shift()
	splitted.shift()
	splitted.shift()
  splitted.shift()
	splitted.pop()
  splitted.pop()
  splitted.pop()
  splitted.pop()

  const columns = [
    [0, 5],
    [5, 8],
    [9, 15],
    [15, 28],
    [28, 34],
  ]

  const data = dummy2json(splitted.join('\n'), columns, 2)
  
  console.log(data)
  return data.map((item) => ({
    f: item.f.replace(/\//g, ''),
    s: item.s.replace(/\//g, ''),
    p: item.p.replace(/\//g, ''),
    native_vlan: item.native_v_l_a_n,
    state: item.state,
    custom_fields: {
      ...item
    }
  }))
}

module.exports = displayVlans