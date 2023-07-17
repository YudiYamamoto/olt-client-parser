const { connect } = require('../../../../config/ssh-connect')

const displayTraffic = async (_options, { port = '1' }) => {
  // const conn = await connect(options)
  // const cmd = `show onu detail-info ${port}`  
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
