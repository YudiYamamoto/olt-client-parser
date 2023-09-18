const { connect } = require('../../../../config/ssh-connect')
const { dummy2json } = require('../../../../utils/lib')

/*
-----------------------------------------------------------------------------
  F/S/P   ONT         SN         Control     Run      Config   Match    Protect
          ID                     flag        state    state    state    side
  -----------------------------------------------------------------------------
  0/ 2/1    0  4D4F4E55005CED01  active      online   failed   match    no
  0/ 2/1    1  4D4F4E5500D4E019  active      online   failed   match    no
  0/ 2/1    2  4D4F4E5500D4E069  active      online   failed   match    no
  0/ 2/1    3  4D4F4E5500D526A9  active      online   failed   match    no
  0/ 2/1    4  54504C47E55624AD  active      online   normal   match    no
  0/ 2/1    5  485754430514429D  active      online   normal   match    no
  0/ 2/1    6  4D4F4E55005CFF89  active      offline  initial  initial  no
  0/ 2/1    7  48575443AEB8075B  active      online   normal   match    no
  0/ 2/1    8  56534F4C00B21439  active      online   failed   match    no
  0/ 2/1    9  4D4F4E5500D72031  active      online   failed   match    no
  0/ 2/1   10  56534F4C00B203E9  active      online   failed   match    no
  0/ 2/1   11  32303131350361BD  active      online   normal   match    no
  0/ 2/1   12  47504F4E0008EB38  active      online   normal   match    no
  0/ 2/1   13  3230313135038105  active      offline  initial  initial  no
  0/ 2/1   14  323031303502FD4B  active      online   normal   match    no
  0/ 2/1   15  32303130350351CB  active      online   normal   match    no
  0/ 2/1   16  323031313503782B  active      offline  initial  initial  no
  0/ 2/1   17  323031303502FBD7  active      online   normal   match    no

*/

const displayOnus = async (options, params) => {
  const { 
    pon_type: type = 'gpon', 
    board = '0', 
    slot = '2', 
    port = '1',
  } = params
  const f_p_s = `${board}/${slot}/${port}`
  const conn = await connect(options)
  const cmd = `scroll 512
  display board 0/2`
  const chunk = await conn.exec7(cmd)

  if (!chunk && chunk === '') return null
  
  const splitted = chunk.split('\r\n')
  splitted.pop()
  splitted.pop()
  splitted.pop()
  splitted.shift()
  splitted.shift()
  splitted.shift()

  console.log(splitted)

  const columns = [
    [0, 11],
    [11, 23],
    [23, 34],
    [34, 46],
    [46, 55],
    [55, 64],
    [64, 73],
  ]
  const elements = dummy2json(splitted.join('\n'), columns, 1).filter((item) => item.onu_index !== '')

  const data = []
  // const { size: length = 128 } = options && options.__extra__ && options.__extra__.onu || {}
  for await (const ont of elements) {
    if (!ont) continue
    const [_, ont_id] = (ont.onu_index || '').split(':') || []
    if (!ont_id) continue
    
    const onu = await displayOnu(options, { ...params, ont_id })
    if (onu) data.push(onu)
  }      

  return data
}

module.exports = displayOnus