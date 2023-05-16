const displayPon = async (options, { board = '1', slot = '1', port = '1' }) => {

  const chunk1 = `177.128.98.246: terminal length 512
IRARA-OLT#show interface ${type}_olt-${board}/${slot}/${port}
  ${type}_olt-${board}/${slot}/${port} is deactivate,line protocol is down.
  The port link up/down notification is trap enable.
Current channel num : 1 GPON
OLT statistic:
    Input rate :                  0 Bps                0 pps
    Output rate:                  0 Bps                0 pps
    Input Instantaneous bandwidth utilization : 0.0%    
    Output Instantaneous bandwidth utilization: 0.0%    
    Input Average bandwidth utilization : 0.0%    
    Output Average bandwidth utilization: 0.0%    
    Output Multicast Instantaneous rate:             N/A Bps                0 pps
Interface peak rate:
    Input peak rate :                  0 Bps                0 pps
    Output peak rate:                  0 Bps                0 pps
Total statistic:
  Input :
    Packets       :0                    DropPackets   :0                   
    PassBytes     :0                    UnicastsPkts  :0                   
    MulticastsPkts:0                    BroadcastsPkts:0                   
    CRCAlignErrors:0                    OversizePkts  :0                   
    UndersizePkts :0                    CollisionPkts : N/A                
    Fragments     : N/A                 Jabbers       : N/A                
    64B       :0                        65-127B   :0                   
    128-255B  :0                        256-511B  :0                   
    512-1023B :0                        1024-1518B:0                   
  Output :
    Packets       :0                    DropPackets   : N/A                
    PassBytes     :0                    UnicastsPkts  :0                   
    MulticastsPkts:0                    BroadcastsPkts:0                   
    64B       :0                        65-127B   :0                   
    128-255B  :0                        256-511B  :0                   
    512-1023B :0                        1024-1518B:0                   
IRARA-OLT#`
  let status = ''
  if (chunk1 && chunk1 !== '') {
    const splitted1 = chunk1.split('\n')
    splitted1.shift()
    splitted1.shift()
    status = splitted1[0]
  }
  return {
    admin_status: (status || '').indexOf('deactivate') > -1 ? false : true,
    operational_status: (status || '').indexOf(' up.') > -1 ? 'up' : 'down',
  }
}

module.exports = displayPon