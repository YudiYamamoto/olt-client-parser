const { connect } = require('../../../../config/ssh-connect')
const { dummy2json, column2json } = require('../../../../utils/lib')

/*
Physical interface   :  gpon 1/1/1, Enabled, Physical link is Up
Link-level type      :  GPON
Logical reach        :  0-40 km
Downstream FEC       :  Enabled
Upstream FEC         :  Enabled
Transceiver type     :  sps-43-48h-hp-cde
Allocated upstream bandwidth
    Fixed + Assured  :  0          kbit/s
    Fixed            :  0          kbit/s
    Assured          :  0          kbit/s
    Max              :  768000     kbit/s
    Overhead         :  99         kbit/s (3 ONUs)
Available upstream bandwidth
    CBR   BW         :  615744     kbit/s
    Total BW         :  1216576    kbit/s
*/

const displayPons = async (options, { slot = '1', port = '1' }) => {
  const cmd = `show interface gpon 1/${slot}/${port}`
  const conn = await connect(options)
  const chunk = await conn.execDatacom(cmd)
  if (!chunk && chunk === '') return null

  const splitted = chunk.split('\r\n')
  splitted.shift()
  splitted.pop()

  const item = column2json(
    splitted
      .map(item2 =>
        item2
          .replace(':', '[$%]')
          .replace(/\:/gi, '-')
          .replace('[$%]', ':')
      )
      .splice(1)
  )

  const physicalInterfaceParts = item['physicalinterface'].split(',');
  const board = physicalInterfaceParts[0].split('/')[0].split(' ')[1];
  const slotValue = physicalInterfaceParts[0].split('/')[1];
  const type = item['link-leveltype'].toUpperCase();
  const portValue = physicalInterfaceParts[0].split('/')[2] || '';
  const operationalStatus = physicalInterfaceParts[1].trim();

  return {
    board,
    slot: slotValue,
    type,
    port: portValue,
    admin_status: false,
    operational_status: operationalStatus,
    description: '',
    min_range: 0,
    max_range: 40,
    scope: [],
    default_for_pon_ports: [],
    custom_fields: {
      ...item
    }
  }
}

module.exports = displayPons
