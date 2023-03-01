const { connect } = require('../../../../../config/telnet-connect')
const { dummy2json } = require('../../../../../utils/lib')

/*
>>> Para verificar nivel de permissão do user:
OlT_CHASSI_0_DC_HOMENET#display terminal user name made4it
  ----------------------------------------------------------------------------
  Name            Level    Status  Reenter Profile         Append
                                   Num                     Info
  ----------------------------------------------------------------------------
  made4it         Admin    Online        4 root            -----
  ----------------------------------------------------------------------------
*/
const displayPermissionByUser = async (options, username) => {
  const conn = await connect(options)

  const columns = [
    [0, 18],
    [18, 27],
    [27, 35],
    [35, 43],
    [43, 59],
    [59, 78],
  ]
  const cmd = `display terminal user name ${username}`  
  const chunk = await conn.exec(cmd)
  const [data] = dummy2json(chunk, columns, 3)
  return data
}

module.exports = displayPermissionByUser