const { connect } = require('../../../../config/ssh-connect')

// Quando estiver com "virgula", é numero unico, quando estiver com "traço (-)", é um range de vlan, por exemplo:
// vlan1, vlan2 ou seja: 1, 2
// vlan81-vlan83 (81 até 83) ou seja: 81, 82 e 83

/*
PARKS# show vlan 
Existing VLANs:  vlan1, vlan100, vlan1000-vlan1100, vlan4020, vlan4094
*/

const expandVlans = function* (range) {
  // exemple: 10-12 => 10, 12
  const [initial, final] = range.split('-');

  for (let index = initial; index <= final; index++) {
    yield Number(index);
  }
}

module.exports = async (options) => {
  const response = await (await connect(options))
    .execParks('show vlan')

  if (!response) return null

  const splitted = response.split('\r\n')
  splitted.shift() // remove: 10.12.13.2: terminal length 0
  splitted.shift() // remove: PARKS#show vlan
  splitted.pop()   // remove: PARKS#

  let vlans = splitted
    .join('') // make array of vlans
    .replace('Existing VLANs:', '') // removes the titles
    .trim() // removes blank spaces before and after
    .split(', ') // split vlans

  return vlans.map(vlan => {
    // exemple: vlan117 => 117
    // exemple: vlan1011-vlan1100 => 1011-1100
    vlan = vlan.replaceAll('vlan', '')

    const CHAR_NOT_FOUND = -1
    if (vlan.indexOf('-') === CHAR_NOT_FOUND) {
      return [Number(vlan)]
    }

    // exemple: 10-13 => 10, 11, 12, 13
    return [...expandVlans(vlan)]
  }).reduce(function(previous, current) {
    return previous.concat(current.sort());
  }).sort((x, y) => x - y)
}
