const { connect } = require('../../../../config/ssh-connect')
const { splitResponse } = require('../../../../utils/parks')

/*
# show interface gpon discovered-onus
Chassis / Slot / Port Serial Number
--------------------- -------------
1/1/1 DACM00000351
1/1/3 DACM00000352
#
*/

const displayUnconfiguredOnus = async (options) => {
  const conn = await connect(options)
  const cmd = `show interface gpon discovered-onus`
  const chunk = await conn.execDatacom(cmd)

  if (!chunk && chunk === '') return null

  const splitted = splitResponse(chunk)
  splitted.shift();
  splitted.shift();

  return splitted.map((item) => {
    const boardValue = item.trim().split(' ')[0].split('/')[0] ?? '';
    const slotValue = item.trim().split(' ')[0].split('/')[1] ?? '';
    const portValue = item.trim().split(' ')[0].split('/')[2] ?? '';
    const sn = item.trim().split(' ')[1] ?? ''

    return {
      pon_type: 'gpon',
      board: boardValue,
      slot: slotValue,
      port: portValue,
      onu_type: '',
      serial_number: sn ?? '',
      description: '',
      authorization_at: null,
    }
  })
}

module.exports = displayUnconfiguredOnus
