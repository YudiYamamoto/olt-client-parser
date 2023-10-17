const { connect } = require('../../../../config/ssh-connect')

const deleteOnu = async (options, {
  pon_type: type = 'gpon',
  board = '0',
  slot = '0', 
  port = '0',
  ont_id = '0',
}) => {
  const conn = await connect(options)
  const cmd = `enable
config
interface ${type} ${board}/${slot}
ont delete ${port} ${ont_id}
quit`
  // service-port native-vlan ${vlan_id} gpon ${slot}/${port}/${pon} ont ${ont_id} gemport ${id_gemport} multi-service user-vlan ${vlan_id} tag-transform translate
  const data = await conn.exec3(cmd)

  return data
}

module.exports = deleteOnu