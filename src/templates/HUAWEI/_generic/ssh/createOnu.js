const { connect } = require('../../../../config/ssh-connect')

const createOnu = async (options, {
  pon_type: type = 'gpon',
  board = '0', 
  slot = '0', 
  port = '0',
  // ont_id = '0',
  name,
  onu_profile,
  serial_number = '4857544302D8C93F',
  line_profile = '0',
  onu_profile = '0',
  description = '',
  onu_lanport = '1',
  priority_number = '7',
  vlan_id = '671',
  gemport
}) => {
  const conn = await connect(options)
  const cmd = `enable
config
interface ${type} ${board}/${slot}
port ${port} ont-auto-find enable
quit
interface ${type} ${board}/${slot}
ont add ${port} sn-auth ${serial_number} omci ont-lineprofile-id ${line_profile} ont-srvprofile-id ${onu_profile} des 
${name}

quit`
  const data = await conn.exec2(cmd)

  console.log(cmd, data)
  // service-port native-vlan ${vlan_id} gpon ${board}/${slot}/${port} ont ${ont_id} gemport ${gemport} multi-service user-vlan ${vlan_id} tag-transform translate
  // quit

  return data
}

module.exports = createOnu