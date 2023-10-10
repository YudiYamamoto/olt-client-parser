const { connect } = require('../../../../config/ssh-connect')
const { column2json, day2time } = require('../../../../utils/lib')

/*
PARKS# show interface gpon1/1
Interface gpon1/1 is up, line protocol is up
  index 4 mtu 12000 
  HWaddr: 00:04:16:0e:f5:d3
  aging-time: 300s
  learning-mode move
  autonegotiation disabled speed-2.5G full-duplex
  Transceiver type any-reset-preamble (manually set)
    input rate 0 Kbps, 0 pps, rxload 0%
    input packets 0, bytes 0, dropped 0
    input errors 0, frame 0
    output rate 0 Kbps, 0 pps, txload 0%
    output packets 0, bytes 0
    output errors 0, collisions 0
  Line protocol is up for 16:58:55
PARKS#
*/

const displayUplinks = async (options, {interface, slot, port} ) => {
  const conn = await connect(options)

  const cmd = `show interface ${interface}${slot}/${port}`
  const chunk = await conn.execParks(cmd)

  if (!chunk && chunk === '') return null

  const splitted = chunk.split('\n')
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.pop()

  if (splitted.length === 0) return null

  const item = column2json(
    splitted
    .map(item2 => 
      item2
        .replace(':', '[$%]')
        .replace(/\:/gi, '-')
        .replace('[$%]', ':')
      )
    .splice(1))

  return {
		name: `${interface}/${slot}/${port}`,
    description: '',
    mode: 'auto',
    custom_fiels: {
      ...item,
    }
	}
}
module.exports = displayUplinks
