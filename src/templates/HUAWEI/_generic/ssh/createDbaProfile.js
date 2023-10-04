const { connect } = require('../../../../config/ssh-connect')

// criando dba profile sem definir um "ID", ele pega o proximo disponivel (0-512)

const createDbaProfile = async (options, { name, type, speed, max=10000000 }) => {
  const conn = await connect(options)

  let speedRange = `fix ${speed}`
  if (type === 2) speedRange = `assure ${speed}`
  if (type === 3) speedRange = `assure ${speed} max ${max}`
  if (type === 4) speedRange = `max ${speed}`

  const cmd = `enable
config
dba-profile add profile-name "${name}" type${type} ${speedRange}

quit
quit`
  await conn.exec2(cmd)
  return cmd
}

module.exports = createDbaProfile
