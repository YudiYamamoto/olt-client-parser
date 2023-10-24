const { connect } = require('../../../../config/ssh-connect')
const { dummy2json } = require('../../../../utils/lib')

/*
              FIXED  ASSURED  ASSURED  MAX          FIXED  ASSURED  MAX
NAME             BW     BW       BW       BW   MAX BW  BW     BW       BW
----------------------------------------------------------------------------
DBA_FIXO         512    -        -        -    -       -      -        -
DBA_UPLOAD_100M  -      -        -        -    102400  -      -        -
MAX_200M         -      -        -        -    204800  -      -        -
MAX_350M         -      -        -        -    358400  -      -        -
*/

const displayDbaProfiles = async (options) => {
const cmd = 'show running-config profile gpon bandwidth-profile | tab | nomore'
const conn = await connect(options)
const chunk = await conn.execDatacom(cmd)
if (!chunk && chunk === '') return null

const splitted = chunk.split('\r\n')
splitted.shift()
splitted.pop()
splitted.pop()

const columns = [
[0, 15],
[16, 21],
[21, 30],
[30, 39],
[39, 52],
[52, 59],
[59, 68],
[68, 80],
]
const data = dummy2json(splitted.join('\n'), columns, 2)

return data
.map((item) =>  {      
  return {
    name: item.name || '',
    type: '1',
    speed: item.dmax_bwmaxb.split('-')[1].trim() || '',
    assured: item.dassure_bw || '',
    fixed: item.fixe_bw || '',
    custom_fields: {
      ...item
    }
  }
})
}

module.exports = displayDbaProfiles