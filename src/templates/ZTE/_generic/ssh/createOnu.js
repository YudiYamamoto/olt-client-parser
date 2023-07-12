const { connect } = require('../../../../config/ssh-connect')

const createOnu = async (options, { 
  pon_type: type = 'gpon', 
  board = '1', 
  slot = '1', 
  port = '1', 
  ont_id = '1', // TODO verificar para trazer com qualidade esse numero
  onu_type,
  serial_number,
  name,
  description
}) => {
  const conn = await connect(options)
  const interface = `${board}/${slot}/${port}`
  const cmd = `configure terminal
interface ${type}-olt_${interface}
onu ${ont_id} type ${onu_type} sn ${serial_number}
name ${name || ''}
description ${description || ''}`
  await conn.exec2(cmd)

  return cmd
}

module.exports = createOnu
