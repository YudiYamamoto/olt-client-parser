const { connect } = require('../../../../config/ssh-connect')
const { dummy2json } = require('../../../../utils/lib')

/* >>> Coletar os numero de ports
OLT-3008-DATACIT-RET# show port
-------------------------------------------------------------------------------
NO        TYPE     PVID  COS    STATUS        MODE         FLOWCTRL   INSTALLED
                            (ADMIN/OPER)                (ADMIN/OPER)
-------------------------------------------------------------------------------
1:          GPON      1   0     Up/Up    Force/Full/2500   Off/ Off       Y
2:          GPON      1   0     Up/Up    Force/Full/2500   Off/ Off       Y
3:          GPON      1   0     Up/Up    Force/Full/2500   Off/ Off       Y
4:          GPON      1   0     Up/Up    Force/Full/2500   Off/ Off       Y
5:          GPON      1   0     Up/Up    Force/Full/2500   Off/ Off       Y
6:          GPON      1   0     Up/Up    Force/Full/2500   Off/ Off       Y
7:          GPON      1   0     Up/Up    Force/Full/2500   Off/ Off       Y
8:          GPON      1   0     Up/Up    Force/Full/2500   Off/ Off       Y
9:      Ethernet   2233   0     Up/Up    Auto/Full/1000    Off/ Off       Y
10:     Ethernet      1   0     Up/Down  Auto/Half/0       Off/ Off       Y
11:     Ethernet      1   0     Up/Down  Auto/Half/0       Off/ Off       Y
12:     Ethernet      1   0     Up/Down  Auto/Half/0       Off/ Off       Y
13:     Ethernet      1   0     Up/Up    Force/Full/1000   Off/ Off       Y
14:     Ethernet      1   0     Up/Down  Force/Full/0      Off/ Off       Y
15:     Ethernet      1   0     Up/Down  Force/Full/0      Off/ Off       Y
16:     Ethernet      1   0     Up/Down  Force/Full/0      Off/ Off       Y
17:     TrkGrp00      1   0     Up/Down  NA/NA/0           N/A/ N/A       Y
18:     TrkGrp01      1   0     Up/Down  NA/NA/0           N/A/ N/A       Y
19:     TrkGrp02      1   0     Up/Down  NA/NA/0           N/A/ N/A       Y
20:     TrkGrp03      1   0     Up/Down  NA/NA/0           N/A/ N/A       Y
21:     TrkGrp04      1   0     Up/Down  NA/NA/0           N/A/ N/A       Y
22:     TrkGrp05      1   0     Up/Down  NA/NA/0           N/A/ N/A       Y
23:     TrkGrp06      1   0     Up/Down  NA/NA/0           N/A/ N/A       Y
24:     TrkGrp07      1   0     Up/Down  NA/NA/0           N/A/ N/A       Y
25:     TrkGrp08      1   0     Up/Down  NA/NA/0           N/A/ N/A       Y
26:     TrkGrp09      1   0     Up/Down  NA/NA/0           N/A/ N/A       Y
27:     TrkGrp10      1   0     Up/Down  NA/NA/0           N/A/ N/A       Y
28:     TrkGrp11      1   0     Up/Down  NA/NA/0           N/A/ N/A       Y
29:     TrkGrp12      1   0     Up/Down  NA/NA/0           N/A/ N/A       Y
30:     TrkGrp13      1   0     Up/Down  NA/NA/0           N/A/ N/A       Y
31:     TrkGrp14      1   0     Up/Down  NA/NA/0           N/A/ N/A       Y
32:     TrkGrp15      1   0     Up/Down  NA/NA/0           N/A/ N/A       Y
*/

const displayUplinks = async (options) => {  
  const conn = await connect(options)
  const cmd = `show port`  
  const chunk = await conn.exec(cmd)
  const splitted = chunk.split('\n')
  splitted.shift()
  
  const columns = [
    [0, 8],
    [8, 19],
    [19, 25],
    [25, 28],
    [28, 40],
    [40, 56],
    [56, 70],
    [70, 80],
  ]

  const data = dummy2json(splitted.join('\n'), columns, 2)

  return data
    .filter((element) => element.type.toLowerCase() === 'ethernet')
    .map((element) => ({
      name: (element.no || '').replace(':', '').trim(),
      description: '',
      port_attribute: '',
      mode: element.mode.trim().toLowerCase().split('/')[1].toLowerCase(),
      speed: element.mode.trim().toLowerCase().split('/')[2],
      admin_status: element['status_(adminoper)'].split('/')[0].toLowerCase(),
      physical_status: element['status_(adminoper)'].split('/')[1].toLowerCase(),
      prot_status: element['status_(adminoper)'].split('/')[1].toLowerCase(),
    }))
}

module.exports = displayUplinks