const { connect } = require('../../../../config/ssh-connect')

const displayTraffic = async (options, { pon_type: type = 'gpon', board = '1', slot = '1', port = '1', ont_id = '1' }) => {
  const conn = await connect(options)
  const cmd = `enable
  show onu detail-info ${port}`  
  // await conn.exec(cmd)
  // return cmd
  const upload = -1
  const download = -1
  return [
    { direction: 'upload', speed: upload },
    { direction: 'download', speed: download },
  ]
}

module.exports = displayTraffic
