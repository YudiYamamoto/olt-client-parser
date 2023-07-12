const { connect } = require('../../../../config/ssh-connect')

const createOnu = async (options, { 
  pon_type: type = 'gpon', 
  slot = '1', 
  port = '1', 
  ont_id = '1',
  name,
  line_profile,
  serial_number,
}) => {
  const conn = await connect(options)
  const cmd = `terminal length 0
${type}
  ${type}-olt ${slot}/${port}
  onu add ${ont_id} ${serial_number} auto-learning
  onu-profile ${ont_id} ${line_profile}
  onu description ${ont_id} ${name || ''}`
  const data = await conn.exec3(cmd)

  return data
}

module.exports = createOnu
