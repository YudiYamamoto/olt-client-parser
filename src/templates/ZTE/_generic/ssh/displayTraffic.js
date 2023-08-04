const { connect } = require('../../../../config/ssh-connect')

const displayTraffic = async (options, { 
  pon_type: type = 'gpon', 
  board = '1', 
  slot = '1', 
  port = '1', 
  ont_id = '1' 
}) => {
  const conn = await connect(options)
  const cmd = `show interface ${type}-onu_${board}/${slot}/${port}:${ont_id}`
  const chunk = await conn.exec2(cmd)

  let upload = -1
  let download = -1
  if (chunk && chunk !== '') {
    const [uploadString] = chunk.match(new RegExp((`Input rate(.*)Bps`), 'gmi')) || []
    const [downloadString] = chunk.match(new RegExp((`Output rate(.*)Bps`), 'gmi')) || []
    upload = parseInt((uploadString || '').split(':')[1].split('Bps')[0].trim(), 10) / 1e+6
    download = parseInt((downloadString || ':0').split(':')[1].split('Bps')[0], 10) / 1e+6
  }

  return [
    { direction: 'upload', speed: upload },
    { direction: 'download', speed: download },
  ]
}

module.exports = displayTraffic
