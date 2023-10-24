const { connect } = require('../../../../../config/ssh-connect')

const displayPon = async (options, { board = '1', slot = '1', port = '1' }) => {
  const conn = await connect(options)
  
  const cmd1 = `show interface gpon_olt-${board}/${slot}/${port}`
  const chunk1 = await conn.exec2(cmd1)
  let status = ''
  if (chunk1 && chunk1 !== '') {
    const splitted1 = chunk1.split('\r\n')
    splitted1.shift()
    splitted1.shift()
    status = splitted1[0]
  }
  return {
    board,
    slot,
    port,
    admin_status: (status || '').indexOf('deactivate') > -1 ? false : true,
    operational_status: (status || '').indexOf(' up.') > -1 ? 'up' : 'down',
  }
}

module.exports = displayPon