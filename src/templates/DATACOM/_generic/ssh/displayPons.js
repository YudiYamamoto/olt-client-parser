const { connect } = require('../../../../config/ssh-connect');
const { column2json } = require('../../../../utils/lib');

/*
Physical interface   :  gpon 1/1/10, Disabled, Physical link is Down
Link-level type      :  GPON
Logical reach        :  0-40 km
Downstream FEC       :  Enabled
Upstream FEC         :  Enabled
Transceiver type     :  sps-43-48h-hp-cde
Allocated upstream bandwidth
    Fixed + Assured  :  0          kbit/s
    Fixed            :  0          kbit/s
    Assured          :  0          kbit/s
    Max              :  0          kbit/s
    Overhead         :  0          kbit/s (0 ONUs)
Available upstream bandwidth
    CBR   BW         :  0          kbit/s
    Total BW         :  0          kbit/s
*/

const displayPons = async (options) => {
  const cmd = 'show interface gpon | nomore';
  const conn = await connect(options);
  const chunk = await conn.execDatacom(cmd);
  if (!chunk || chunk === '') return null;

  const splitted = chunk.split('\r\n');
  splitted.shift();
  splitted.pop();

  const ponGroup = [];
  let pon = {};

  for (const line of splitted) {
    if (line.trim() === '') {
      if (Object.keys(pon).length > 0) {
        ponGroup.push(pon);
        pon = {};
      }
    } else {
      const parts = line.split(':');
      if (parts.length === 2) {
        const key = parts[0].trim();
        const value = parts[1].trim();
        pon[key] = value;
      }
    }
  }

  if (Object.keys(pon).length > 0) {
    ponGroup.push(pon);
  }

  return ponGroup.map((item) => {
    const physicalInterfaceParts = item['Physical interface'].split(',');
    const board = physicalInterfaceParts[0].split('/')[0].split(' ')[1];
    const slotValue = physicalInterfaceParts[0].split('/')[1];
    const type = item['Link-level type'].toUpperCase();
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
      // custom_fields: { 
      //   ...item
      // }
    };
  });
};

module.exports = displayPons;
