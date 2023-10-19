const { connect } = require('../../../../config/ssh-connect')

// Last updated            : 2000-02-19 23:07:35 UTC-3

//  ID                      : 17
//  Serial Number           : ABNC89745623
//  Password                : 
//  Uptime                  : 0 min
//  Last Seen Online        : N/A
//  Vendor ID               : N/A
//  Equipment ID            : N/A
//  Name                    : Rafael_teste
//  Operational state       : Down
//  Primary status          : Inactive
//  Distance                : N/A [km]
//  IPv4 mode               : Not configured
//  IPv4 address            : 
//  IPv4 default gateway    : 
//  IPv4 VLAN               : 
//  IPv4 CoS                : 
//  Line Profile            : ONU-PROFILE-GERAL
//  Service Profile         : ONU_BRIDGE
//  RG Profile              : 
//  RG One Shot Provision   : Not provisioned
//  TR069 ACS Profile       : 
//  SNMP                    : Disabled
//  Allocated bandwidth     : 0 fixed, 0 assured+fixed [kbit/s]
//  Upstream-FEC            : Enabled
//  Anti Rogue ONU isolate  : Disabled
//  Version                 : N/A
//  Active FW               : N/A N/A, N/A
//  Standby FW              : N/A N/A, N/A
//  Software Download State : None
//  Rx Optical Power [dBm]  : N/A
//  Tx Optical Power [dBm]  : N/A

const createOnu = async (options, params) => {
  const {
    pon_type: type = 'gpon',
    board = '0', 
    slot = '0', 
    port = '0',
    serial_number = '4857544302D8C93F',
    line_profile = '0',
    onu_profile = '0',
		service_port = '0',
    name,
    description,
    ont_id = '0',
    vlan_id,
    gemport
  } = params
  const desc = description || name || '-'
  const conn = await connect(options)
  const cmd = `config
  interface ${interface}  ${board}/${port}/${ont_id}
  onu ${ont_id}
  name ${name}
  serial-number ${serial_number}
  service-profile ${service_profile} line-profile ${line_profile}
  ethernet ${ethernet}
  native vlan vlan-id ${vlan_id}
  top
  service-port ${service_port} ${pon_type} ${board}/${slot}/${port} onu ${ont_id} gem ${gemport} match 
	vlan vlan-id ${vlan_id} action vlan replace vlan-id ${vlan_id}
	quit`
  const chunk = await conn.execDatacom(cmd)
  if (!chunk && chunk === '') return null

  return {
    ...params,
    ont_id
  }
}

module.exports = createOnu