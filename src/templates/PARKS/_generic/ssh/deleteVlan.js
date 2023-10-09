const { connect } = require('../../../../config/ssh-connect')

// Assim que a VLAN é deletada, ele também já deleta das interfaces

module.exports = async (options, { vlan }) => {
  return (await connect(options)).execParks([
    'conf t',
    'vlan database',
    `no vlan ${vlan}`,
    'end',
  ]);
}
