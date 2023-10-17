const { connect } = require('../../../../config/ssh-connect')
const { column2json } = require('../../../../utils/lib')

/*
MA5608T#display ont autofind all
   ----------------------------------------------------------------------------
   Number              : 1
   F/S/P               : 0/0/0
   Ont SN              : 4857544302D8C93F (HWTC-02D8C93F)
   Password            : 0x00000000000000000000
   Loid                :
   Checkcode           :
   VendorID            : HWTC
   Ont Version         : 6A5.A
   Ont SoftwareVersion : V3R015C10S106
   Ont EquipmentID     : 310M
   Ont Customized Info : -
   Ont autofind time   : 16/10/2023 23:47:09-02:00 DST
   ----------------------------------------------------------------------------
   The number of GPON autofind ONT is 1
*/

const displayUnconfiguredOnus = async (options) => {
  const conn = await connect(options)
  const cmd = `enable
display ont autofind all`
  const chunk = await conn.exec7(cmd)
  if (!chunk && chunk === '') return null

  const splitted = chunk
    .split('\r\n')
    .map(item => item.trim())
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

  if (splitted && Array.isArray(splitted) && splitted[0] && splitted[0].indexOf('Failure') > -1) return null

  const data = splitted
    .join('\n')
    .split('----------------------------------------------------------------------------')
    .map(item => column2json(
      item
        .split('\n')
        .filter(item => item !== '')
        .map(item2 => 
          (item2 || '')
            .replace(':', '[$%]')
            .replace(/\:/gi, '-')
            .replace('[$%]', ':')
        )
        .splice(1)
      )
    )
  return data.map((item) => {
    const [serial_number] = (item.ont_s_n || '').split(' (')
    const [board, slot, port] = (item.fsp || '').split('/')
    return {
      pon_type: 'gpon',
      board,
      slot,
      port,
      onu_type: item.ont_equipment_i_d,
      serial_number,
      description: item.ont_customized_info,
      custom_fields: {
        ...item,
      }
    }
  })
  .filter(item => item.board && item.board !== '')
}

module.exports = displayUnconfiguredOnus