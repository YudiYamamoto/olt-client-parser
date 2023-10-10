const { connect } = require('../../../../config/ssh-connect')
const { dummy2json } = require('../../../../utils/lib')

//SAIDA 
/* 
	10.12.13.2: terminal length 0
	PARKS#show gpon onu unconfigured
	Interface       | Serial       | Model                         
	--------------- + ------------ +------------------------------
	gpon1/1         | prks00b80c94 | Fiberlink 1100B (SFU) Rev 2   
	gpon1/1         | prks00ce1e95 | FiberLink101                  
	gpon1/1         | prks00ce1e94 | FiberLink101          
	PARKS#        
*/ 

module.exports = async (options) => {
	const response = await (await connect(options))
		.execParks('show gpon onu unconfigured');
	
	if (!response) return null;

	const output = response.replace(/[|+-]/g, '');
	//SAIDA com replace
	/*
		10.12.13.2: terminal length 0
		PARKS#show gpon onu unconfigured
		Interface        Serial        Model                         
			
		gpon1/1          prks00b80c94  Fiberlink 1100B (SFU) Rev 2   
		gpon1/1          prks00ce1e95  FiberLink101                  
		gpon1/1          prks00ce1e94  FiberLink101                  
		PARKS#
	*/

	const splitted = output.split('\r');
	splitted.shift(); // remove: 10.12.13.2: terminal length 0
	splitted.shift(); // remove: PARKS#show gpon onu unconfigured
	//Content
	splitted.pop(); // remove: PARKS#

	const columns = [
    [0, 17],  // interface
    [17, 31], // serial
    [31, 70], // model
  ]

	const data = dummy2json(splitted.join('\n'), columns, 1)
	const regex = /^(?<pon_type>gpon)(?<board>\d+?)?(?:\/|\.?)?(?<slot>\d+?)?$/;
	
	// console.log(data);
	// return;
	return data.map((item) => {
		let interface = item.interface.match(regex).groups;
		console.log(item);

		return {
      pon_type: interface.pon_type,
			board: interface.board || '',
      slot: interface.slot || '',
			port: interface.port || '',
			onu_type: item.model,
			serial_number: item.serial.toUpperCase(),
			custom_fields: {
				...item,
			}
		};
	})

}