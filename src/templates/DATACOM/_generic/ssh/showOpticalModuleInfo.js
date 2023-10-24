const { connect } = require('../../../../config/ssh-connect')
const { dummy2json, column2json } = require('../../../../utils/lib')
const { splitResponse } = require('../../../../utils/parks')
//const { commandOpticalModuleInfo, generateOpticalModuleInfo } = require('./execOpticalModuleInfo')

/*
OLT_Teste# show interface gpon 1/1/1 onu 1
	Last updated            : 2000-02-18 23:00:35 UTC-3

	ID                      : 1
	Serial Number           : DACM91BE1164
	Password                :
	Uptime                  : 44 days, 08:44
	Last Seen Online        : N/A
	Vendor ID               : DACM
	Equipment ID            : DM986-204
	Name                    :
	Operational state       : Up
	Primary status          : Active
	Distance                : 0 [km]
	IPv4 mode               : Not configured
	IPv4 address            :
	IPv4 default gateway    :
	IPv4 VLAN               :
	IPv4 CoS                :
	Line Profile            : ONU-PROFILE-GERAL
	Service Profile         :
	RG Profile              :
	RG One Shot Provision   : Not provisioned
	TR069 ACS Profile       :
	SNMP                    : Disabled
	Allocated bandwidth     : 0 fixed, 0 assured+fixed [kbit/s]
	Upstream-FEC            : Enabled
	Anti Rogue ONU isolate  : Disabled
	Version                 : 825.8018.00
	Active FW               : V2.2.0 valid, committed
	Standby FW              : V2.2.0 invalid, not committed
	Software Download State : None
	Rx Optical Power [dBm]  : -8.98
	Tx Optical Power [dBm]  : 2.22       
*/

const showOpticalModuleInfo = async (options, params) => {
	const { 
		board,
		slot,
		port,
		ont_id
	} = params
	const cmd = `show interface gpon ${board}/${slot}/${port} onu ${ont_id} | nomore`;
	const conn = await connect(options)
	const chunk = await conn.execDatacom(cmd)
	if (!chunk && chunk === '') return null

	const splitted = splitResponse(chunk);
	splitted.pop();

	const filtered = splitted.filter(item => item !== '');
	
	const data = filtered
		.map(item => column2json(
			item
			.split('\n')
			.map(item2 => 
				item2
					.replace(':', '[$%]')
					.replace(/\:/gi, '-')
					.replace('[$%]', ':')
				)
			)
		)
		
	return {
		ont_id: data[1].id, 
		rx_power: data[30]['rx_optical_power[d_bm]'],
		tx_power: data[31]['tx_optical_power[d_bm]'],
		olt_rx_ont_power_dbm: data[30]['rx_optical_power[d_bm]'] || '',
		temperature_c: null,
		voltage_v: null,
		current_ma: null,
		distance_m: data[11].distance,
		custom_fields: {
			...data,
		}
	}
}

module.exports = showOpticalModuleInfo
