const { connect } = require('../../../../config/ssh-connect')
const { dummy2json } = require('../../../../utils/lib')

/*
OLT-3008-DATACIT-RET# show vlan 866
                            u: untagged port, t: tagged port
        -----------------------------------------------------
                            |         1         2         3
            Name( VID| FID) |12345678901234567890123456789012
        -----------------------------------------------------
           br866( 866| 866) |.......t....t...................
*/

const displayVlans = async (options, name) => {
  const conn = await connect(options)
  const cmd = `enable
show vlan ${name}`  
  const chunk = await conn.exec3(cmd)
  
  const splitted = chunk.split('\n')
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.pop()
  splitted.pop()

  const columns = [
    [0, 16],
    [17, 21],
    [22, 26],
  ]
  
  const data = dummy2json(splitted.join('\n'), columns, 1)
  const [vlan] = data.map((item) => ({ 
    name: item.vid, 
    description: item.name,
    custom_fields: {
      ...item
    }
  }))
  return vlan
}
module.exports = displayVlans