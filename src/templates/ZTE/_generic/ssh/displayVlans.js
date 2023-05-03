const { connect } = require('../../../../config/ssh-connect')
const { dummy2json } = require('../../../../utils/lib')

/*
IRARA-OLT#show vlan summary
All created vlan num: 71  
Details are following:
  1,11,40-41,99,303,500,502,667,854,856,865,1001
1300,2021,2201,2234,2237,2239-2242,2306
2501-2548
Hardware operate fail following:
  
IRARA-OLT#

*/

const displayVlans = async (originalOptions) => {
  const conn = await connect(originalOptions)
  const cmd = 'show vlan summary'
  const chunk = await conn.exec2(cmd)
  const [match] = chunk.split('Details are following:').reverse()[0].split('Hardware operate fail following:')
  const hidrate = match.trim().split('\r\n').join(',').split(',')
  const data = []
  for (const item of hidrate) {
    let [start, end] = item.split('-')
    if (!end) end = start
    while(start <= end) {
      data.push(start.toString())
      start++
    }
  }
  return data
}

module.exports = displayVlans