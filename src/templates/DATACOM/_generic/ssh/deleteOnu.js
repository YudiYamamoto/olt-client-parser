const { connect } = require('../../../../config/ssh-connect')

const deleteOnu = async (options, {
  pon_type: type = 'gpon',
  servicePort,
  board,
  slot, 
  port,
  ont_id,
}) => {
  if (!board && !slot && port && !ont_id) return null
  const conn = await connect(options)
  const cmd = `config
  no service-port ${servicePort}
  interface gpon ${board}/${slot}/${port}
  no onu ${ont_id}
  top
  commit
  exit
  `
  const chunk = await conn.execDatacom(cmd)
  if (!chunk && chunk === '') return null

  return cmd
}

module.exports = deleteOnu