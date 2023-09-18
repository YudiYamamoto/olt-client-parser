const { connect } = require('../../../../../config/ssh-connect')
const { dummy2json } = require('../../../../../utils/lib')
const displayOnu = require('./displayOnu')

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
  const f_p_s = `${board}/${slot}/${port}`
  const conn = await connect(options)
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

  const data = []
  // const { size: length = 128 } = options && options.__extra__ && options.__extra__.onu || {}
  for await (const ont of elements) {
    if (!ont) continue
    const [_, ont_id] = (ont.onu_index || '').split(':') || []
    if (!ont_id) continue
    
    // TODO Verificar
    const onu = await displayOnu(options, { ...params, ont_id })
    if (onu) data.push(onu)
  }      

  return data
}

module.exports = displayOnus