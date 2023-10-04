const { connect } = require('../../../../config/ssh-connect')

module.exports = async (options, { interface, vlan }) => {
  return (await connect(options)).execParks([
    'conf t',
    `interface ${interface}`,
    `switchport trunk allowed vlan remove ${vlan}`,
    'end',
  ]);
}
