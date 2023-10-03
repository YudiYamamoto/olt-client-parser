const { connect } = require('../../../../config/ssh-connect')
const { dummy2json } = require('../../../../utils/lib')

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
  const response = await (await connect(options))
    .execParks('show interface description')

  if (!response) return null

  const splitted = response.split('\r')
  splitted.shift() // remove: 10.12.13.2: terminal length 0
  splitted.shift() // remove: PARKS#show interface description
  splitted.pop()   // remove: PARKS#

  const columns = [
    [0, 24],  // interface
    [24, 32], // status
    [32, 42], // protocol
    [42, 53], // description
  ]

  const data = dummy2json(splitted.join('\n'), columns, 1)
  const regex = /^(?<type>giga-ethernet|10giga-ethernet|mgmt|gpon|loopback)(?<board>\d+?)?(?:\/|\.?)?(?<slot>\d+?)?$/;

  return data.map((item) => {
    let interface = item.interface.match(regex).groups;

    return {
      board: interface.board || 0,
      slot: interface.slot || 0,
      type: interface.type,
      real_type: item.description,
      software_version: '',
      available: item.status.toLowerCase().indexOf('up') > -1,
      role: 'main',
      custom_fields: {}
    };
  });
}
