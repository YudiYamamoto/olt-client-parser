const { connect } = require('../../../../../config/ssh-connect')
const { getChunks } = require('../../../../../config/chunks')
const { dummy2json } = require('../../../../../utils/lib')
const { runCommand: runCommandOnu, generateCommmand: generateCommmandOnu } = require('../common/onu')
const { generateCommmand: generateCommmandMac } = require('../common/mac')
const { generateCommmand: generateCommmandSignal } = require('../common/signal')

/*
OnuIndex            Type        Mode    AuthInfo                State
-------------------------------------------------------------------------------
gpon-onu_1/1/15:1   SM16101-GHZ sn      SN:SU10B2019C15         ready
                    -T10                                        
gpon-onu_1/1/15:2   F601        sn      SN:ZTEGC4BB98CB         ready
gpon-onu_1/1/15:3   F601        sn      SN:ZTEGC4BB8435         ready
gpon-onu_1/1/15:4   F601        sn      SN:ZTEGC4BBA5F8         ready
gpon-onu_1/1/15:5   F601        sn      SN:ZTEGC4BB97D9         ready
gpon-onu_1/1/15:6   F601        sn      SN:ZTEGC4BB9905         ready
gpon-onu_1/1/15:7   F601        sn      SN:ZTEGC4BB9871         ready
gpon-onu_1/1/15:8   F601        sn      SN:ZTEGC4BB987A         ready
gpon-onu_1/1/15:9   SM16101-GHZ sn      SN:SU10B2019C17         ready
                    -T10                                        
gpon-onu_1/1/15:10  SM16101-GHZ sn      SN:SU10B2019C21         ready
                    -T10                                        
gpon-onu_1/1/15:11  SM16101-GHZ sn      SN:SU10B2019BA1         ready
                    -T10                                        
gpon-onu_1/1/15:12  F601        sn      SN:ZTEGC4BB9858         ready
gpon-onu_1/1/15:13  SM16101-GHZ sn      SN:SU10B2019BF3         ready
                    -T10                                        
gpon-onu_1/1/15:15  SM16101-GHZ sn      SN:SU10B2019BC9         ready
                    -T10                                        
gpon-onu_1/1/15:16  SM16101-GHZ sn      SN:SU10B2019C01         ready

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
  const cmd = `show ${type} onu baseinfo ${type}-olt_${f_p_s}`
  const chunk = await conn.exec2(cmd)

  if (!chunk && chunk === '') return null
  
  const splitted = chunk.split('\r\n')
  splitted.pop()
  splitted.pop()
  splitted.shift()
  splitted.shift()

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