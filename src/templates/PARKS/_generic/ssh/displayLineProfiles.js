const { connect } = require('../../../../config/ssh-connect')
const { columnTraversal, splitResponse } = require('../../../../utils/parks')

/*
PARKS# show gpon profile flow
bridge_60
Index | Type     | VLAN | COS | Encryption | Downstream | Bandwidth Name           | Shared | PBMP Ports
1     | IPHOST   | 100  | -   | DISABLED   | 0          | gerencia                 | No     | 1 
2     | PBMP     | 60   | -   | DISABLED   | 0          | pppoe                    | No     | 1 2 3 4 
pppoe
Index | Type     | VLAN | COS | Encryption | Downstream | Bandwidth Name           | Shared | PBMP Ports
1     | IPHOST   | 100  | -   | DISABLED   | 0          | gerencia                 | No     | 1 
2     | VEIP     | 500  | -   | DISABLED   | 0          | pppoe                    | No     | 
test
Index | Type     | VLAN | COS | Encryption | Downstream | Bandwidth Name           | Shared | PBMP Ports
1     | UNKNOWN  | -    | -   | DISABLED   | 0          | ---                      | No     | 
PARKS# 
*/

const displayLineProfiles = async (options) => {
  const conn = await connect(options)
  const cmd = 'show gpon profile flow'
  const chunk = await conn.execParks(cmd)

  if (!chunk && chunk === '') return null

  const splitted = splitResponse(chunk)
  splitted.shift()

  const data = [];
  let name = '';
  let isHeader = true;

  for (const item of splitted) {
    if (!item.includes('|')) {
      name = item;
      isHeader = true;
    } else {
      if (isHeader) {
        isHeader = false;
        continue;
      }

      const values = item.split('|').map(value => value.trim());

      const sectionData = {
        name: name,
        index: values[0].trim(),
        type: values[1],
        vlan: values[2],
        cos: values[3],
        encryption: values[4],
        downstream: values[5],
        bandwidthName: values[6],
        shared: values[7],
        pbmpports: values[8]
      };

      data.push(sectionData);
    }
  }

  return data.map((item) => {
    return {
      name: item.name,
      tcont: {
        gems: item.index,
        dba_profile: item.bandwidthName,
      },
      custom_fields: {
        ...item
      }
    }
  })
}
module.exports = displayLineProfiles
