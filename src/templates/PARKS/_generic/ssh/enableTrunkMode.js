const { connect } = require('../../../../config/ssh-connect')

module.exports = async (options, { interface, mode="trunk" }) => {
  return (await connect(options)).execParks([
    'conf t',
    `interface ${interface}`,
    `switchport mode ${mode}`,
    'end',
  ]);
}
