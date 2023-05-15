const { dummy2json } = require('../../../../utils/lib')
const chance = require('chance').Chance();

const up_down = () => chance.bool({ likelihood: 70 }) ? 'up' : 'down'

const displayUplinks = async (_originalOptions) => {
  const chunk = `IRARA-OLT#show interface brief
Interface      Portattribute  Mode  BW(Mbps)  Admin Phy   Prot  Description 
xgei-1/5/1     optical    Duplex/full  ${chance.integer({ min: 100, max: 10000 }).toString().padEnd(5)}  ${up_down()}    ${up_down()}    ${up_down()}    
xgei-1/5/2     optical    Duplex/full  ${chance.integer({ min: 100, max: 10000 }).toString().padEnd(5)}  ${up_down()}    ${up_down()}    ${up_down()}  
xgei-1/5/3     optical    Duplex/half  ${chance.integer({ min: 100, max: 10000 }).toString().padEnd(5)}  ${up_down()}    ${up_down()}    ${up_down()}  
xgei-1/5/4     optical    Duplex/half  ${chance.integer({ min: 100, max: 10000 }).toString().padEnd(5)}  ${up_down()}    ${up_down()}    ${up_down()}    
xgei-1/6/1     optical    Duplex/auto  ${chance.integer({ min: 100, max: 10000 }).toString().padEnd(5)}  ${up_down()}    ${up_down()}    ${up_down()}  
xgei-1/6/2     optical    Duplex/auto  ${chance.integer({ min: 100, max: 10000 }).toString().padEnd(5)}  ${up_down()}    ${up_down()}    ${up_down()}  
xgei-1/6/3     optical    Duplex/auto  ${chance.integer({ min: 100, max: 10000 }).toString().padEnd(5)}  ${up_down()}    ${up_down()}    ${up_down()}  
xgei-1/6/4     optical    Duplex/auto  ${chance.integer({ min: 100, max: 10000 }).toString().padEnd(5)}  ${up_down()}    ${up_down()}    ${up_down()}  
IRARA-OLT#`
  const chunks = chunk.split('\n')
  chunks.shift()
  chunks.shift()
  chunks.shift()
  chunks.pop()

  const items = [
    'Interface      PortattribuMode         BW     Admin Phy   Prot  Description ',
    ...chunks
  ]

  const columns = [
    [0, 15],
    [15, 26],
    [26, 39],
    [39, 46],
    [46, 52],
    [52, 58],
    [58, 64],
    [64, 100],
  ]

  const data = dummy2json(items.join('\n'), columns, 0)

  return data.map((element) => ({
    name: element.interface,
    description: element.description,
    port_attribute: element.portattribu,
    mode: element.mode.trim().toLowerCase().split('/')[1],
    speed: element.bw,
    admin_status: element.admin,
    physical_status: element.phy,
    prot_status: element.prot,
  }))

  /*
  const dataSource = [
    {
      key: '1',
      port_attribute: 'optical',
      name: 'xgei-1/5/1',
      mode: `Duplex/Full`,
      speed: '10000',
      physical_status: 'up',
      prot_status: 'down',
      port: '1',
      description: 'Uplink 1',
      type: 'SFP',
      admin_status: 'Up',
      status: true,
      negotiation: 'Auto',
      mtu: '1500',
      wavelength: '1310',
      temp: '25',
      pvid_untag: '1',
      mode_tagged_vlan: 'Tagged',
    },
  ];
  */
}

module.exports = displayUplinks