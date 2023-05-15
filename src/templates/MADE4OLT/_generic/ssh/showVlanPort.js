const { hidrateInfo } = require('../../../../utils/lib')

const showVlanPort = async (_options, interface) => {
  const chunk = `IRARA-OLT#show vlan port ${interface}
PortMode  Pvid CPvid Tpid   TLSStatus TLSVlan  TpidFilter
--------------------------------------------------------------------
trunk     --   --    0x8100 disable   --       --
UntaggedVlan:
  
TaggedVlan:
  40,99,2201,2237,2306,2501-2548`
  const [matchUntagged, matchTagged] = chunk.replace('\n', ' ').split('UntaggedVlan:')[1].split('TaggedVlan:')
  return {
    untagged: hidrateInfo(matchUntagged).filter(item => item !== ''),
    tagged: hidrateInfo(matchTagged).filter(item => item !== '')
  }
}

module.exports = showVlanPort
