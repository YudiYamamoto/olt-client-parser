const { connect } = require('../../../../config/ssh-connect')

// criando srv profile sem definir um "ID", ele pega o proximo disponivel (0-8192)

const createSrvProfile = async (options, { service_profile,  onu_profile}) => {
  const conn = await connect(options)
  const cmd = `config
    profile gpon service-profile ${service_profile}
    onu-profile ${onu_profile}
    top
    commit
  exit`
  await conn.execDatacom(cmd)

  return cmd
}

module.exports = createSrvProfile
