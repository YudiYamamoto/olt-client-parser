const { connect } = require('../../../../config/ssh-connect')
const { dummy2json } = require('../../../../utils/lib')

/*
-------------------------------------------------------------------------
SlotID  BoardName  Status          SubType0 SubType1    Online/Offline
-------------------------------------------------------------------------
0     
1     
2       H806GPBD   Normal                           
3     
4       H806GPBD   Normal                           
5     
6     
7       H801SCUN   Active_normal                    
8       H802SCUN   Standby_normal                   
9     
10    
11    
12    
13    
14    
15      H805GPBD   Normal                           
16    
17      H801X2CS   Normal                           
18      H801X2CS   Normal                           
19    
20                                 
-------------------------------------------------------------------------
  */

const displaySlots = async (options, { board = '0' }) => {  
  const cmd = `scroll 512
  display board ${board}`
  const conn = await connect(options)
  const chunk = await conn.exec7(cmd)
  if (!chunk && chunk === '') return null
  
  const splitted = chunk.split('\r\n')
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.pop()
  splitted.pop()

  const columns = [
    [0, 9],
    [9, 20],
    [20, 36],
    [36, 45],
    [45, 57],
    [57, 74],
  ]
  
  const data = dummy2json(splitted.join('\n'), columns, 1)

  return data.map((item) => ({ 
    board,
    slot: item.slot_i_d,
    type: item.board_name,
    real_type: item.board_name,
    software_version: '',
    available: item.status.toLowerCase().indexOf('normal') > -1,
    role: 'main',
    custom_fields: {
      ...item,
    }
  }))
}

module.exports = displaySlots