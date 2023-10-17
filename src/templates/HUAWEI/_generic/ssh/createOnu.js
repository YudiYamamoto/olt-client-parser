const { connect } = require('../../../../config/ssh-connect')

const createOnu = async (options, {
  pon_type: type = 'gpon',
  slot = '0', 
  port = '0',
  pon = '0', 
  ont_id = '0',
  name,
  onu_profile,
  serial_number = '4857544302D8C93F',
  id_lineProfile = '0',
  id_serviceProfile = '0',
  onu_description = 'teste',
  onu_lanport = '1',
  priority_number = '7',
  vlan_id = '671',
  id_gemport
}) => {
  const conn = await connect(options)
  const cmd = `enable
  config
  interface gpon ${slot}/${port}
  port ${port} ont-auto-find enable
  quit
  interface gpon ${slot}/${port}
  ont add ${pon} sn-auth ${serial_number} omci ont-lineprofile-id ${id_lineProfile} ont-srvprofile-id ${id_serviceProfile} des 
  ${onu_description}
  
  quit`
  console.log(cmd)
  // service-port native-vlan ${vlan_id} gpon ${slot}/${port}/${pon} ont ${ont_id} gemport ${id_gemport} multi-service user-vlan ${vlan_id} tag-transform translate
  // quit
  const data = await conn.exec2(cmd)

  return data
}

module.exports = createOnu