const { connect } = require('../../../../config/ssh-connect')

// criando srv profile sem definir um "ID", ele pega o proximo disponivel (0-8192)

const createSrvProfile = async (options, { profile_name, vlan, profile_id=null, type="gpon", number_of_eth_ports=null, number_of_voip_ports=null, eth_set_vlan_from_port=1, eth_set_vlan_to_port=4 }) => {
  const conn = await connect(options)

  // TODO: fazer pra portas wifi, vdsl, tdm e moca tambem
  if (number_of_eth_ports === null) number_of_eth_ports = 'adaptive'
  if (number_of_voip_ports === null) number_of_voip_ports = 'adaptive'

  let ont_srvprofile = `ont-srvprofile ${type} profile-name "${profile_name}"`

  if (profile_id !== null) ont_srvprofile += ` profile-id ${profile_id}`

  const cmd = `enable
config
${ont_srvprofile}

ring check enable
ont-port pots ${number_of_voip_ports} eth ${number_of_eth_ports}
port vlan eth ${eth_set_vlan_from_port}-${eth_set_vlan_to_port} ${vlan}

quit
y
quit
quit`
  await conn.exec2(cmd)
  return cmd
}

module.exports = createSrvProfile
