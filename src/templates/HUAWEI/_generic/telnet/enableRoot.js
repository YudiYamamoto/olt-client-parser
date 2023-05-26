const { connect } = require('../../../../config/telnet-connect')

/*
>>> Para habilitar o modo "root":

OlT_CHASSI_0_DC_HOMENET>enable

*/
const enableRoot = async (options) => {
  const conn = await connect({ ...options, shellPrompt: '#' })

  const cmd = 'enable'  
  await conn.exec(cmd)
  return true
}

module.exports = enableRoot