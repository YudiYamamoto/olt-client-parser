const { connect } = require('../../../../config/ssh-connect')

// A interface precisa estar em TRUNK antes da untag

module.exports = async (options, { interface, vlan }) => {
  return (await connect(options)).execParks([
    'conf t',
    `interface ${interface}`,
    `switchport access vlan ${vlan}`,
    'end',
  ]);
}
