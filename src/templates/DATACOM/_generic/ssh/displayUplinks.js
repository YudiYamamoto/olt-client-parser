const { connect } = require("../../../../config/ssh-connect");
const { dummy2json } = require("../../../../utils/lib");
const { splitResponse } = require("../../../../utils/parks");

/*
177.128.199.14: show interface link | nomore
Gigabit Ethernet Interfaces:
CHASSIS                                                                         
ID/SLOT                                                                         
ID/PORT                                 Disabled  Blocked  Parent               
ID       Link  Shutdown  Speed  Duplex  by        by       LAG     Description  
--------------------------------------------------------------------------------
1/1/1    Down  false     -      -       -         -        -                    
1/1/2    Down  false     -      -       -         -        -                    
1/1/3    Down  false     -      -       -         -        -                    
1/1/4    Down  false     -      -       -         -        -                    

Ten Gigabit Ethernet Interfaces:
CHASSIS                                                                            
ID/SLOT                                                                            
ID/PORT                                 Disabled  Blocked  Parent                  
ID       Link  Shutdown  Speed  Duplex  by        by       LAG     Description     
-----------------------------------------------------------------------------------
1/1/1    Down  false     -      -       -         -        -       UPLINK-EXEMPLO  
1/1/2    Down  false     -      -       -         -        -                       
1/1/3    Down  false     -      -       -         -        -                       
1/1/4    Down  false     -      -       -         -        -                       

OLT_Teste#
*/

const displayUplinks = async (options) => {
  const conn = await connect(options);
  const cmd = `show interface link | nomore`;
  const chunk = await conn.execDatacom(cmd);
  if (!chunk && chunk === "") return null;
  
  const splitted = splitResponse(chunk);
  splitted.pop();

  const filter = splitted.map(row => {
    return ['CHASSIS', 'ID/SLOT', 'ID/PORT'].some(field => row.includes(field))
      ? row.replace('ID/PORT', '       ')
      : row;
  });
  const filtered = filter.filter(row => !['CHASSIS', 'ID/SLOT', 'ID/PORT'].some(field => row.includes(field)));
  const uplinks = filtered.join('\n').split(/\n+/);

  const uplinksGroup = [];
  let interfaceName = '';

  for (const line of uplinks) {
    if (line.includes(' Interfaces:')) {
      interfaceName = line.trim().replace(' Interfaces:', '');
    } else if (line.match(/^\d/)) {
      const [id, link, shutdown, speed, duplex, disabledBy, blockedBy, lag, description] = line.split(/\s+/);
      uplinksGroup.push({
        name: interfaceName,
        description,
        port_attribute: id.split('/')[2],
        mode: duplex,
        speed,
        admin_status: '',
        physical_status: link,
        prot_status: ''
      });
    }
  }

  return uplinksGroup;
};

module.exports = displayUplinks;