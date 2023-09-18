const { connect } = require('../../../../config/ssh-connect')
const { dummy2json } = require('../../../../utils/lib')

/*
------------------------------------------------------------------------------
  Port  Port Optic   Native  MDI    Speed     Duplex    Flow-  Active   Link
        Type Status  VLAN           (Mbps)              Ctrl   State
  ------------------------------------------------------------------------------
     0  GE   absence      1  -      auto      auto      off    active   offline
     1  GE   absence      1  -      auto      auto      off    active   offline
     2  GE   absence      1  -      auto      auto      off    active   offline
     3  GE   absence      1  -      auto      auto      off    active   offline
  ------------------------------------------------------------------------------
*/

const displayUplinks = async (originalOptions, board = '2') => {
  const conn = await connect(originalOptions)
  const cmd = `enable 
  undo smart
  display board  0/${board}`
  const chunk = await conn.exec7(cmd)
  if (!chunk && chunk === '') return null

  
  const splitted = chunk.split('\r\n')

  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.pop()
  splitted.pop()

  console.log(splitted);

  const columns = [
    [0, 8],
    [8, 13],
    [13, 21],
    [21, 29],
    [29, 36],
    [36, 46],
    [46, 56],
    [56, 63],
    [63, 72],
    [72, 80],
  ]
  
  const data = dummy2json(splitted.join('\n'), columns, 2)

  console.log(data)

  return data.map((item) => ({ 
    name: item.port,
    description: '',
    port_attribute: item.optic__status,
    mode: item.duplex,
    speed: item['speed_(_mbps)'],
    admin_status: item.active__state,
    physical_status: item.link,
    prot_status: item.port__type,

    /*
    native_vlan: item.native_vlan,
    flow_ctrl: item.flow_ctrl,
    custom_fields: {
      ...item,
    }
    */

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