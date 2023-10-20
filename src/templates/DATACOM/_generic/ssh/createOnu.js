const { connect } = require('../../../../config/ssh-connect')

const createOnu = async (options, params) => {
  const {
    board = '1', 
    slot = '1', 
    port = '1',
    serial_number = 'ASBC544302D8',
    service_profile = 'ONU_BRIDGE',
    line_profile = 'ONU-PROFILE-GERAL',
    ethernet = '2', 
    onu_profile = '0',
		service_port = '1',
    name = 'Rafael_teste2',
    ont_id = '19',
    vlan_id = '141',
    gemport = '1',
  } = params
  const conn = await connect(options)
  const cmd = `config
    interface gpon ${board}/${slot}/${port}
    onu ${ont_id}
    name ${name}
    serial-number ${serial_number}
    service-profile ${service_profile} line-profile ${line_profile}
    ethernet ${ethernet}
    native vlan vlan-id ${vlan_id}
    top
    service-port ${service_port} gpon ${board}/${slot}/${port} onu ${ont_id} gem ${gemport} match vlan vlan-id ${vlan_id} action vlan replace vlan-id ${vlan_id}
    top
    commit
	  exit`
  const chunk = await conn.execDatacom(cmd)

  if (!chunk && chunk === '') return null

  return {
    ...params,
    ont_id
  }
}

module.exports = createOnu