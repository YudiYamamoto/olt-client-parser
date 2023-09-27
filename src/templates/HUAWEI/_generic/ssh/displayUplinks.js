const { connect } = require('../../../../config/ssh-connect')
const { dummy2json } = require('../../../../utils/lib')

/*

MA5608T#display current-configuration section public-config | include "monitor uplink-port"
  It will take a long time if the content you search is too much or the string  you input is too long, you can press CTRL_C to break
 monitor uplink-port traffic port 0/2/0
 monitor uplink-port traffic port 0/2/1
 monitor uplink-port traffic port 0/2/2
 monitor uplink-port traffic port 0/2/3

MA5608T# 

*/

const displayUplinks = async (options) => {
  const conn = await connect(options)
  const cmd = `enable
display current-configuration section public-config | include "monitor uplink-port"`
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
  splitted.pop()
  splitted.pop()

  return splitted.map((item) => ({ 
    name: item.replace('monitor uplink-port traffic port ', '').trim(),
    description: '',
    mode: 'auto'
  }))
}

module.exports = displayUplinks