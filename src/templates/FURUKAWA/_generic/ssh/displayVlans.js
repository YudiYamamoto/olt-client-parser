const { connect } = require('../../../../config/ssh-connect')
const { dummy2json } = require('../../../../utils/lib')

/*
OLT-SERRA-GRANDE-3008(bridge)# show vlan
                            u: untagged port, t: tagged port
        -----------------------------------------------------
                            |         1         2         3
            Name( VID| FID) |12345678901234567890123456789012
        -----------------------------------------------------
         default(   1|   1) |.........u...uuuu.uuuuuuuuuuuuuu
            br11(  11|  11) |tttttttt........................
            br20(  20|  20) |t................t..............
            br29(  29|  29) |.................t..............
            br99(  99|  99) |tttttttt.........t..............
           br201( 201| 201) |t................t..............
           br217( 217| 217) |.t...............t..............
           br218( 218| 218) |.t...............t..............
           br500( 500| 500) |............t....t..............
           br666( 666| 666) |............u...................
          br1709(1709|1709) |tttttttt.........t..............
          br1801(1801|1801) |t................t..............
          br1802(1802|1802) |.t...............t..............
          br1803(1803|1803) |..t..............t..............
          br1804(1804|1804) |...t.............t..............
          br1805(1805|1805) |....t............t..............
          br1806(1806|1806) |.....t...........t..............
          br1807(1807|1807) |......t..........t..............
          br1808(1808|1808) |.......t.........t..............
OLT-SERRA-GRANDE-3008(bridge)#
*/

const displayVlans = async (options) => {
  const conn = await connect(options)
  const cmd = `enable
conf t
bridge
show vlan`  
  const chunk = await conn.exec3(cmd)
  
  const splitted = chunk.split('\n')
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

  const columns = [
    [0, 16],
    [17, 21],
    [22, 26],
  ]

  const data = dummy2json(splitted.join('\n'), columns, 1)
  const list = [];

  for (const item of data) {
    list.push(item.vid)
  }
  return list
}
module.exports = displayVlans