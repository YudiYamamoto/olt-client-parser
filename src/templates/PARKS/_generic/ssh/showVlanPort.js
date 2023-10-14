const { connect } = require('../../../../config/ssh-connect')
const { expandVlans } = require('../../../../utils/parks')
const { flatten, CHAR_NOT_FOUND } = require('../../../../utils/lib')

// Tudo que tiver na frente de "switchport trunk allowed vlan",
// são as vlans que estão na porta

const TAGGED_VLANS = 'switchport trunk allowed vlan'
module.exports = async (options, interface) => {
  const response = await (await connect(options))
    .execParks(`show running-config interface ${interface}`)

  if (!response) return null

  const splitted = response.split('\r\n')
  splitted.shift() // remove: 10.12.13.2: terminal length 0
  splitted.shift() // remove: PARKS#show running-config interface giga-ethernet0/1
  splitted.shift() // remove: !
  // Content
  splitted.pop()   // remove: !
  splitted.pop()   // remove: PARKS#

  return {
    untagged:[],
    tagged: flatten(splitted.filter(instruction => {
      return instruction.indexOf(TAGGED_VLANS) !== CHAR_NOT_FOUND
    }).map(instruction => {
      const vlans = instruction
        .replace(TAGGED_VLANS, '') // removes the title
        .trim() // removes blank spaces before and after
        .split(',') // split vlans

      return vlans.map(vlan => {
        if (vlan.indexOf('-') === CHAR_NOT_FOUND) return [Number(vlan)]
        return [...expandVlans(vlan)]
      });
    }).reduce((previous, current) => {
      return previous.concat(current);
    })),
  };
}
