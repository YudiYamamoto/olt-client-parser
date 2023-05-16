const chance = require('chance').Chance()

const displayTraffic = async (_options, { pon_type: type = 'gpon', board = '1', slot = '1', port = '1', ont_id = '1' }) => {
  const chunk1 = `177.128.98.246: terminal length 512
IRARA-OLT#show interface ${type}_onu-${board}/${slot}/${port}:${ont_id}
ONU statistic:
    Input rate :           ${(chance.integer({ min: 0, max: 99999999 })).toString().padStart(8, '0')} Bps              114 pps
    Output rate:           ${(chance.integer({ min: 0, max: 99999999 })).toString().padStart(8, '0')} Bps              454 pps
    Input bandwidth utilization :0.0%
    Output bandwidth utilization: N/A
Interface peak rate:
    Input peak rate :           ${(chance.integer({ min: 0, max: 99999999 })).toString().padStart(8, '0')} Bps            11636 pps
    Output peak rate:           ${(chance.integer({ min: 0, max: 99999999 })).toString().padStart(8, '0')} Bps            11581 pps
Total statistic:
  Input :
    Bytes:172133952589         Packets:592186321
  Output:
    Bytes:3009448418256        Packets:2483129494
IRARA-OLT#`
  
  const [uploadString] = chunk1.match(new RegExp((`Input rate(.*)Bps`), 'gmi')) || []
  const [downloadString] = chunk1.match(new RegExp((`Output rate(.*)Bps`), 'gmi')) || []
  const upload = parseInt((uploadString || []).split(':')[1].split('Bps')[0].trim(), 10) / 1e+6
  const download = parseInt((downloadString || ':0').split(':')[1].split('Bps')[0], 10) / 1e+6

  return [
    { direction: 'upload', speed: upload },
    { direction: 'download', speed: download },
  ]
}

module.exports = displayTraffic