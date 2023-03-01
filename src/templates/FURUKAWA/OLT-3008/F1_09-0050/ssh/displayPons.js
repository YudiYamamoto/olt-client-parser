const displayPons = async (_options, { board = '1', slot = '1' }) => {  
  return Array.from({ length: 16 }, (_, port) => ({
    board,
    slot,
    type: 'gpon',
    port: (port + 1).toString(),
    admin_status: false,
    operational_status: 'up',
    description: '',
    min_range: 0,
    max_range: 0,
    scope: [],
    default_for_pon_ports: [],
  }))
}

module.exports = displayPons