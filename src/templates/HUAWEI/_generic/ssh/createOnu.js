const { connect } = require('../../../../config/ssh-connect')

const createOnu = async (options, params) => {
  const {
    pon_type: type = 'gpon',
    board = '0', 
    slot = '0', 
    port = '0',
    serial_number = '4857544302D8C93F',
    line_profile = '0',
    onu_profile = '0',
    name,
    description,
    // ont_id = '0',
    vlan_id,
    gemport
  } = params
  const desc = description || name || '-'
  const conn = await connect(options)
  const cmd = `enable
config
interface ${type} ${board}/${slot}
port ${port} ont-auto-find enable
quit
interface ${type} ${board}/${slot}
ont add ${port} sn-auth ${serial_number} omci ont-lineprofile-id ${line_profile} ont-srvprofile-id ${onu_profile} des ${desc}
quit
quit`
  const chunk = await conn.exec7(cmd)
  if (!chunk && chunk === '') return null

  const splitted = chunk
    .split('\r\n')
    .filter(item => item.indexOf('Failure: ') <= -1)
    .map(item => item.trim())
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
  splitted.pop()
  splitted.pop()

  const [data] = splitted || []
  const [ONTID] = data.split(',').reverse()
  const ont_id = (ONTID || '').replace(' ONTID :', '')

  if (vlan_id && vlan_id !== '' && ont_id && ont_id !== '' && gemport) {
    const cmd_service_port = `enable
config
service-port native-vlan ${vlan_id} ${type} ${board}/${slot}/${port} ont ${ont_id} gemport ${gemport} multi-service user-vlan ${vlan_id} tag-transform translate
quit`
    await conn.exec7(cmd_service_port)
  }
  return {
    ...params,
    ont_id
  }
}

module.exports = createOnu