const { connect } = require('../../../../config/ssh-connect')

module.exports = async (options, command) => {
  return (await connect(options)).execParks([command]);
}
