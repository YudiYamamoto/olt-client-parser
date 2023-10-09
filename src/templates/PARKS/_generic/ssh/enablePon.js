const { connect } = require('../../../../config/ssh-connect')

module.exports = async (options, { interface }) => {
  return (await connect(options)).execParks([
    'conf t',
    `interface ${interface}`,
    `no shutdown`,
    'end',
  ]);
}
