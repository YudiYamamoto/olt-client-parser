const displaySlots = require('./displaySlots')

module.exports = async (options) => {
  const interfaces = await displaySlots(options);
  return interfaces.filter(item => item.type === 'gpon')
}
