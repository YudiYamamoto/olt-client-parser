const { connect } = require('../../../../config/telnet-connect')
const { dummy2json, column2json, text2table } = require('../../../../utils/lib')

/*
>>> Mostra dados específicos de cada placa:

>>>> Ex placa PON:

OlT_CHASSI_0_DC_HOMENET#display board 0/0

  ---------------------------------------
  Board Name          : H807GPBH
  Board Status        : Normal
  ---------------------------------------

  ------------------------------------------------------------------------------
  Power Status      Power-off cause                    Power-off Time
  ------------------------------------------------------------------------------
  POWER-ON          -                                  -
  ------------------------------------------------------------------------------
  -------------------------------------------------------------
    Port   Port   min-distance   max-distance   Optical-module
           type       (km)           (km)           status
  -------------------------------------------------------------
    0     GPON        0              20             Online
    1     GPON        0              20             Online
    2     GPON        0              20             Online
    3     GPON        0              20             Online
    4     GPON        0              20             Online
    5     GPON        0              20             Online
    6     GPON        0              20             Online
    7     GPON        0              20             Online
  -------------------------------------------------------------
  -----------------------------------------------------------------------------
  F/S/P   ONT         SN         Control     Run      Config   Match    Protect
          ID                     flag        state    state    state    side
  -----------------------------------------------------------------------------
  0/ 0/0    0  48575443315DAF1F  active      online   failed   mismatch no
  0/ 0/0    1  48575443C473CDA4  active      online   failed   mismatch no

--------------------------------------------------------------------------------------------------------------------------------------------------

*/
const displayPon = async ({ params, ...options }, { board: boardNumber, pon }) => {
  const { numberPort } = params
  const conn = await connect(options)

  const cmd = `display board ${boardNumber}/${pon}`  
  const chunk = await conn.exec(cmd)

  const array = chunk.split(/\n/)

  const board = column2json([...array].slice(2, 4))

  const power_columns = [
    [0, 20],
    [20, 55],
    [55, 80],
  ]
  const power_data = [...array].slice(6, 10).join('\n')
  const [power] = dummy2json(power_data, power_columns, 2)
  
  const port_columns = [
    [0, 10],
    [10, 17],
    [17, 32],
    [32, 46],
    [46, 63],
  ]
  const MAX_LEN = 15 + numberPort
  const port_data = [...array].slice(11, MAX_LEN).join('\n').toString()
  const ports = dummy2json(port_data, port_columns, 3)
  
  const pon_columns = [
    [0, 10],
    [10, 13],
    [13, 33],
    [33, 45],
    [45, 54],
    [54, 63],
    [63, 72]
  ]
  const { posnr, data: table_pons } = text2table(array, MAX_LEN + 1)
  const pons = dummy2json(table_pons, pon_columns, 3)
  
  // console.log(chunk)
  return {
    ...board,
    ...power,
    ports,
    pons,
    posnr
  }
}

module.exports = displayPon