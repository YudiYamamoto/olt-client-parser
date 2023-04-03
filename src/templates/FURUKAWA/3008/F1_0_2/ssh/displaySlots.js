const displaySlots = async (_options, { board = '1' }) => {  
  return [{ 
    board,
    slot: '1',
    type: 'NT-GPON',
    real_type: 'NT-GPON',
    software_version: 'REV00',
    available: true,
    role: 'main',
  }]
}

module.exports = displaySlots