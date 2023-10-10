const { connect } = require('../../../../config/ssh-connect')
const { dummy2json, CR, LF } = require('../../../../utils/lib')
const { INTERFACE_SPLIT, splitResponse } = require('../../../../utils/parks')

/*
PARKS# show interface description
Interface               Status  Protocol  Description
10giga-ethernet0/0      up      unknown
10giga-ethernet0/1      up      unknown
giga-ethernet0/0        up      unknown
giga-ethernet0/1        up      unknown   UPLINK
giga-ethernet0/2        up      unknown
giga-ethernet0/3        up      unknown
giga-ethernet0/4        up      unknown
giga-ethernet0/5        up      unknown
giga-ethernet0/6        up      unknown
giga-ethernet0/7        up      unknown
gpon1/1                 up      unknown
gpon1/2                 up      unknown
gpon1/3                 up      unknown
gpon1/4                 up      unknown
gpon1/5                 up      unknown
gpon1/6                 up      unknown
gpon1/7                 up      unknown
gpon1/8                 up      unknown
loopback0               up      unknown
mgmt                    up      unknown
mgmt1                   up      unknown
mgmt1.100               up      unknown
mgmt1.4020              up      unknown
*/

module.exports = async (options) => {
  let response = await (await connect(options))
    .execParks('show interface description')

  if (!response) return null

  response = splitResponse(response, line_feed=CR)
  response.shift() // remove: PARKS#show interface description

  const columns = [
    [0, 24],  // interface
    [24, 32], // status
    [32, 42], // protocol
    [42, 53], // description
  ]

  response = dummy2json(response.join(LF), columns, 1)
  return response.map((description) => {
    let interface = description.interface?.match(INTERFACE_SPLIT).groups;

    return {
      board: 0,
      slot: Number(interface.slot) || 0,
      port: Number(interface.port) || 0,
      type: interface.type,
      real_type: description.description,
      software_version: '',
      available: description.status.toLowerCase().indexOf('up') > -1,
      role: 'main',
      custom_fields: {}
    };
  });
}
