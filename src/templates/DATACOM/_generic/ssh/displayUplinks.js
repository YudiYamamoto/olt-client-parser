const { connect } = require("../../../../config/ssh-connect");
const { dummy2json } = require("../../../../utils/lib");
const { splitResponse } = require("../../../../utils/parks");

//STANDBY 
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
  
  const filtered = chunk.replace(/CHASSIS|ID\/SLOT|ID\/PORT/g, '');
  const splitted = splitResponse(filtered);
	console.log(splitted)
	return;
  splitted.shift();
  splitted.pop();
  splitted.pop();
  
  const filterWhiteSpace = splitted.filter(item => item.trim() !== '');
	
  console.log(filterWhiteSpace);
  return;

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

  const data = dummy2json(splitted.join('\n'), columns, 2)
  console.log(data)
  return

  return data.map((item) => ({
		name: item.name,
    description,
    port_attribute,
    mode,
    speed,
    admin_status: null,
    physical_status: null,
    prot_status: null,
  }));
};

module.exports = displayUplinks;