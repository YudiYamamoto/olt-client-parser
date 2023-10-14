const { connect } = require('../../../../config/ssh-connect')

// A interface precisa estar em TRUNK antes da tag

module.exports = async (options, { pon_type, board, slot, port , vlan }) => {
  const INTERFACES = {
    'gpon': 'giga-ethernet',
  }
  const interface = `${slot}/${port}`
  return (await connect(options)).execParks([
    'conf t',
    `interface ${interface}`,
    `switchport trunk allowed vlan add ${vlan}`,
    'end',
  ]);
}
