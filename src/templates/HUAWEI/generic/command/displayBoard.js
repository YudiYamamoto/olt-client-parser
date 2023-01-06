const { connect } = require('../../../../config/telnet-connect')
const dummy2json = require('../../../../utils/dummy2json')

/*
>>> Mostra placas do chassi:
OlT_CHASSI_0_DC_HOMENET#display board 0
  -------------------------------------------------------------------------
  SlotID  BoardName  Status          SubType0 SubType1    Online/Offline
  -------------------------------------------------------------------------
  0       H807GPBH   Normal
  1       H805GPFD   Normal
  2       H801MCUD1  Active_normal   CPCB
  3
  4       H801MPWE   Normal
  5       H801MPWE   Normal
  -------------------------------------------------------------------------

*/
const displayBoard = async (options, board) => {
  const conn = await connect(options)

  const columns = [
    [0, 10],
    [10, 21],
    [21, 37],
    [37, 46],
    [46, 58],
    [58, 75],
  ]
  const cmd = `display board ${board}`  
  const chunk = await conn.exec(cmd)
  const data = dummy2json(chunk, columns, 2)
  return data
}

module.exports = displayBoard