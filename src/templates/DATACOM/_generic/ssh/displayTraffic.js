const { connect } = require('../../../../config/ssh-connect')
const { column2json } = require('../../../../utils/lib')
const { splitResponse } = require('../../../../utils/parks')

/*
OLT_Teste# show interface gpon 1/1/1 onu 1 ethernet 1 statistics | nomore
Physical interface  : ethernet 1, Enabled, Physical link is down
  Link-level type             : Ethernet
  Speed                       : 
  Duplex                      : 
  Negotiation                 : Enabled
  Status Negotiation          :  
  Native VLAN                 : 140
  Native VLAN CoS             : 0
  MAC limit                   : Unlimited
  Traffic statistics          :
    Input Octets              : 0
    Input Total Packets       : 0
      Input Unicast Packets   : 0
      Input Multicast Packets : 0
      Input Broadcast Packets : 0
    Input Discarded Packets   : 0
    Input Error Packets       : 0
    Output Octets             : 0
    Output Total Packets      : 0
      Output Unicast Packets  : 0
      Output Multicast Packets: 0
      Output Broadcast Packets: 0
    Output Discarded Packets  : 0
    Output Error Packets      : 0
OLT_Teste# 
*/

const displayTraffic = async (options, { 
  pon_type: type = 'gpon', 
  board = '1', 
  slot = '1', 
  port = '1', 
  ont_id = '1',
  ethernet = '1'
}) => {
  const conn = await connect(options)
  const cmd = `show interface ${type} ${board}/${slot}/${port} onu ${ont_id} ethernet ${ethernet} statistics | nomore`
  const chunk = await conn.execDatacom(cmd)

  if (!chunk || chunk === '') return null

  const splitted = splitResponse(chunk)
  splitted.shift();

  const data = splitted
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
  
  const upload = parseInt(data.find(item => item.hasOwnProperty('input_octets')).input_octets ?? 0)
  const download = parseInt(data.find(item => item.hasOwnProperty('output_octets')).output_octets ?? 0)

  return [
    { direction: 'upload', speed: upload },
    { direction: 'download', speed: download },
  ]
}

module.exports = displayTraffic
