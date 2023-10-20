const { connect } = require("../../../../config/ssh-connect");
const { dummy2json } = require("../../../../utils/lib");
const { splitResponse } = require("../../../../utils/parks");

//EM PROGRESS
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

  const filtered = splitted.filter(row => !['CHASSIS', 'ID/SLOT', 'ID/PORT'].some(field => row.includes(field)));

  const columns = [
    [0, 11],
    [11, 17],
    [17, 27],
    [27, 34],
    [34, 42],
    [42, 52],
    [52, 61],
    [61, 69],
    [69, 82],
  ]

  const data = filtered.filter((row) => !/^[-\s]+$/.test(row));
  const uplinks = data.join('\n').split(/\n+/);

  console.log(uplinks)
  return;

  return data.map((item) => ({
		chassis: item.chassis,
    idSlot: item.id[1],
    idPort: item.id[2],
    disabled: item[3],
    blocked: item[4],
    parent: item[5],
    id: item[6],
    link: item[7],
    shutdown: item[8],
    speed: item[9],
    duplex: item[10],
    by1: item[11],
    by2: item[12],
    lag: item[13],
    description: item[14],
  }));
};

module.exports = displayUplinks;