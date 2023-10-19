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
[0, 17],
[17, 24],
[24, 33],
[33, 42],
[42, 55],
[55, 62],
[62, 71],
[71, 80],
]

const data = dummy2json(splitted.join('\n'), columns, 2)

return data
.map((item) =>  {      
  return {
    name: item.name || '',
    type: item.type || '',
    speed: item.max_bwmaxbw.split('-    ')[1] || '',
    assured: item.assured_bw || '',
    fixed: item.fixed_bw || '',
    custom_fields: {
      ...item
    }
  }
})
}

module.exports = displayDbaProfiles