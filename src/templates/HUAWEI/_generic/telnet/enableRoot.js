const { connect } = require('../../../../config/telnet-connect')

/*
>>> Para habilitar o modo "root":

OlT_CHASSI_0_DC_HOMENET>enable

*/
const enableRoot = async (options) => {
  const conn = await connect({ ...options, shellPrompt: '#' })

  const cmd = 'enable'  
  const chunk = await conn.exec(cmd)
  console.log(chunk)
  return true
}

module.exports = enableRoot