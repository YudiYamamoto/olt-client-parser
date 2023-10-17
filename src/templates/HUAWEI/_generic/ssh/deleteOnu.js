const { connect } = require('../../../../config/ssh-connect')

const deleteOnu = async (options, {
  pon_type: type = 'gpon',
  board,
  slot, 
  port,
  ont_id,
}) => {
  if (!board && !slot && port && !ont_id) return null
  const conn = await connect(options)
  const cmd = `enable
config
interface ${type} ${board}/${slot}
ont delete ${port} ${ont_id}
quit`
  // service-port native-vlan ${vlan_id} ${type} ${slot}/${port}/${pon} ont ${ont_id} gemport ${id_gemport} multi-service user-vlan ${vlan_id} tag-transform translate
  const chunk = await conn.exec7(cmd)
  if (!chunk && chunk === '') return null

  const splitted = chunk.split('\r\n')
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.pop()
  splitted.pop()
  splitted.pop()
  splitted.pop()

  return splitted[0].indexOf('success: 1') > -1
}

module.exports = deleteOnu