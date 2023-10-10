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

	const splitted = output.split('\r');
	splitted.shift();
	splitted.shift();
	splitted.pop();

	const columns = [
    [0, 17],
    [17, 31],
    [31, 70],
  ]

	const data = dummy2json(splitted.join('\n'), columns, 1)
	const regex = /^(?<pon_type>gpon)(?<board>\d+?)?(?:\/|\.?)?(?<slot>\d+?)?$/;
	return data.map((item) => {
		let interface = item.interface.match(regex).groups;

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