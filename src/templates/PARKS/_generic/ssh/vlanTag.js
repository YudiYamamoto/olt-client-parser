const { connect } = require('../../../../config/ssh-connect')

// A interface precisa estar em TRUNK antes da tag

module.exports = async (options, { interface, vlan }) => {
  return (await connect(options)).execParks([
    'conf t',
    `interface ${interface}`,
    `switchport trunk allowed vlan add ${vlan}`,
    'end',
  ]);
}
