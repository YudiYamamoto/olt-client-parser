const { connect } = require('../../../../../config/telnet-connect')
const displayPon = async (options, { board = '1', slot = '1', port = '1' }) => {
  const conn = await connect(options)
  
  const cmd1 = `show interface gpon_olt-${board}/${slot}/${port}`
  const chunk1 = await conn.exec(cmd1)
  const [status] = chunk1.split('\n')

  return {
    admin_status: (status || '').indexOf('activate') > -1 ? true : false,
    operational_status: (status || '').indexOf(' up.') > -1 ? 'up' : 'down',
  }
}

module.exports = displayPon