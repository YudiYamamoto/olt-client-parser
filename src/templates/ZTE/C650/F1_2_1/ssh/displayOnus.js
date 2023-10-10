const { connect } = require('../../../../../config/ssh-connect')
const { getChunks } = require('../../../../../config/chunks')
const { dummy2json } = require('../../../../../utils/lib')
const { runCommand: runCommandOnu, generateCommmand: generateCommmandOnu } = require('../common/onu')
const { generateCommmand: generateCommmandMac } = require('../common/mac')
const { generateCommmand: generateCommmandSignal } = require('../common/signal')

/*
IRARA-OLT#show gpon onu baseinfo gpon_olt-1/1/1                                                                                                                                                       
OnuIndex            Type        Mode    AuthInfo                State
-------------------------------------------------------------------------------
gpon_onu-1/1/1:1    630-10B     sn      SN:FRKW2782DDD6         ready
gpon_onu-1/1/1:2    630-10B     sn      SN:FRKW2782DDBE         ready
gpon_onu-1/1/1:3    630-10B     sn      SN:FRKW236A3375         ready
gpon_onu-1/1/1:4    630-10B     sn      SN:FIOG5400BB17         ready
gpon_onu-1/1/1:5    630-10B     sn      SN:FIOG5400B637         ready
gpon_onu-1/1/1:6    630-10B     sn      SN:FRKW236A3B51         ready
gpon_onu-1/1/1:7    630-10B     sn      SN:FRKW27825090         ready
gpon_onu-1/1/1:8    630-10B     sn      SN:FRKW276BA5FB         ready
gpon_onu-1/1/1:9    630-10B     sn      SN:FRKW276BCD7B         ready
gpon_onu-1/1/1:10   630-10B     sn      SN:FRKW276BCDC5         ready
gpon_onu-1/1/1:11   630-10B     sn      SN:FRKW236AC137         ready
gpon_onu-1/1/1:12   630-10B     sn      SN:FRKW2782EC6E         ready
gpon_onu-1/1/1:13   630-10B     sn      SN:FRKW236AC143         ready
gpon_onu-1/1/1:14   630-10B     sn      SN:FRKW236AC0DD         ready
gpon_onu-1/1/1:15   630-10B     sn      SN:FRKW236AC0D7         ready
gpon_onu-1/1/1:16   630-10B     sn      SN:FIOG54006435         ready
gpon_onu-1/1/1:17   630-10B     sn      SN:FRKW278363D6         ready
gpon_onu-1/1/1:18   630-10B     sn      SN:FRKW276BF8E7         ready
gpon_onu-1/1/1:19   630-10B     sn      SN:FRKW236A3B8D         ready
gpon_onu-1/1/1:20   630-10B     sn      SN:FRKW2369F211         ready
gpon_onu-1/1/1:21   630-10B     sn      SN:FRKW2369EB5B         ready
gpon_onu-1/1/1:22   630-10B     sn      SN:FRKW235F66E1         ready
gpon_onu-1/1/1:23   630-10B     sn      SN:FRKW235F674B         ready
gpon_onu-1/1/1:24   630-10B     sn      SN:FRKW235C7497         ready
gpon_onu-1/1/1:25   630-10B     sn      SN:FRKW235C749F         ready
gpon_onu-1/1/1:26   630-10B     sn      SN:FRKW278363AE         ready
gpon_onu-1/1/1:27   630-10B     sn      SN:FRKW27837C9A         ready
gpon_onu-1/1/1:28   630-10B     sn      SN:FRKW236AC0F1         ready
gpon_onu-1/1/1:29   630-10B     sn      SN:FRKW236AC123         ready
gpon_onu-1/1/1:30   630-10B     sn      SN:FRKW2782EC54         ready
gpon_onu-1/1/1:31   630-10B     sn      SN:FRKW235C60C7         ready
gpon_onu-1/1/1:32   630-10B     sn      SN:FRKW235C4A9F         ready
gpon_onu-1/1/1:33   630-10B     sn      SN:FRKW235C4A21         ready
gpon_onu-1/1/1:35   630-10B     sn      SN:FRKW235C00AF         ready
gpon_onu-1/1/1:36   630-10B     sn      SN:FRKW235C005F         ready
gpon_onu-1/1/1:37   630-10B     sn      SN:FRKW235C7E57         ready
gpon_onu-1/1/1:38   630-10B     sn      SN:FRKW27828F44         ready
gpon_onu-1/1/1:39   ONT100      sn      SN:FIOG5400675F         ready
gpon_onu-1/1/1:41   LD420-10R   sn      SN:FRKW11756D49         ready
gpon_onu-1/1/1:42   LD420-10R   sn      SN:FRKW11746BE8         ready
gpon_onu-1/1/1:43   LD420-10R   sn      SN:FRKW1536AB3F         ready
gpon_onu-1/1/1:44   LD420-10R   sn      SN:FRKW117453A8         ready
gpon_onu-1/1/1:45   LD420-10R   sn      SN:FRKW1536809F         ready
gpon_onu-1/1/1:46   LD420-10R   sn      SN:FRKW15376837         ready
*/

const displayOnus = async (options, params) => {
  const { 
    pon_type: type = 'gpon', 
    board = '1', 
    slot = '1', 
    port = '1',
  } = params
  const conn = await connect(options)
  
  const f_p_s = `${board}/${slot}/${port}`
  const cmd = `show ${type} onu baseinfo ${type}_olt-${f_p_s}`
  const chunk = await conn.exec2(cmd)

  if (!chunk && chunk === '') return null
  
  const splitted = chunk.split('\r\n')
  splitted.shift()
  splitted.shift()
  splitted.pop()

  const columns = [
    [0, 20],
    [20, 32],
    [32, 40],
    [40, 64],
  ]
  const elements = dummy2json(splitted.join('\n'), columns, 1).filter((item) => item.onu_index !== '')

  const commands = []
  // const { size: length = 128 } = options && options.__extra__ && options.__extra__.onu || {}
  for await (const ont of elements) {
    if (!ont) continue
    const [_, ont_id] = (ont.onu_index || '').split(':') || []
    if (!ont_id) continue

    const cmdOnu = generateCommmandOnu(type, f_p_s, ont_id)
    const cmdMac = generateCommmandMac(type, f_p_s, ont_id)
    const cmdSignal = generateCommmandSignal(type, f_p_s, ont_id)

    commands.push(cmdOnu)
    commands.push(cmdMac)
    commands.push(cmdSignal)
  }

  let data = []
  const chunkCommands = getChunks(commands, 90)
  for await (const [_index, chunkRecords] of chunkCommands.entries()) {
    const chunkData = await conn.exec2(chunkRecords.join('\n'))
    if (!chunkData && chunkData === '') continue
  
    const dataSplitted = chunkData.split('\r\n')
    dataSplitted.shift()
    dataSplitted.pop()
    
    const filtered = dataSplitted.join('\r\n')    
      .split(`show ${type} onu detail-info`)
      .map(item => {
        const data = item.trim().split('\r\n')
        data.shift()
        data.shift()
        return data.join('\r\n')
      })
      .filter(item => !!item)
      .map(data => {
        const [line] = data.split(`${f_p_s}:`).reverse()
        const [ont_id] = line.split('\r\n')
        const onu = runCommandOnu(data, board, slot, port, ont_id)
        return {
          ...onu,
          custom_fields: {
            ...onu && onu.custom_fields,
            element: elements.find(item => item.onu_index.indexOf(`${f_p_s}:${ont_id}`))
          }
        }
      })
      
    data = [...data, ...filtered]
  }
  return data
}

module.exports = displayOnus