const {
  getNextValueFromObject,
  text2label,
  CHAR_NOT_FOUND,
  CRLF,
} = require('./lib')

const INTERFACE_SPLIT = /^(?<type>giga-ethernet|10giga-ethernet|mgmt|gpon|loopback)(?<slot>\d+?)?(?:\/|\.?)?(?<port>\d+?)?$/;

const ONU_STATUS = {
  'Active': 'online',
  // 'LOS': 'los', // TODO: verificar como fica em uma ONU com los
  // 'DyingGasp': 'pwr_fail', // TODO: verificar em uma ONU com power fail
}

const PON_STATUS = {
  'Active Working': 'up',
  // '?': 'down', // TODO: verificar como fica quando a PON ta down
}

const JUNKS = [
  '-----------------------------------------------------',
  '----------------------------------------------',
  'INDEXMAC ADDRESSVLANGEM PORTSTATIC',
  '% Incomplete command.',
  'MAC table entries:',
  'Transceiver',
  'Vendor',
]

// Transform OLT response string into array of instructions
const splitResponse = (response, line_feed=CRLF) => {
  response = response.split(line_feed)
  response.shift() // remove: 10.12.13.2: terminal length 0
  // Content
  response.pop() // remove: PARKS#
  return response
}

// Example: 10-13 => 10, 11, 12, 13
const expandVlans = function* (range) {
  const [initial, final] = range.split('-');
  for (let index = initial; index <= final; index++) {
    yield Number(index);
  }
}

// remove junk lines
const removeJunksFromResponse = (splitted = []) => {
  return splitted.filter(line => {
    return !JUNKS.map(junk => {
      return line === '' || line.indexOf(junk) !== CHAR_NOT_FOUND
    }).includes(true)
  }).map(line => {
    return line
      .replaceAll('  ', '') // removes unwanted spaces
      .replaceAll(' :', ':') // removes unwanted spaces
      .replaceAll(' |', '|') // removes unwanted spaces
      .replaceAll('| ', '|') // removes unwanted spaces
      .trim()// removes blank spaces before and after
  })
}

// split response lines by commands
const splitResponseByCommands = (response = [], commands = {}) => {
  let instructions = {}
  Object.entries(commands).map(([key, command]) => {
    let current = null

    if (typeof instructions[key] !== 'array') instructions[key] = []

    response.map(instruction => {
      if (instruction.indexOf(command) !== CHAR_NOT_FOUND) {
        current = key;
        return null;
      }

      if (key !== Object.keys(commands).at(-1) && instruction.indexOf(getNextValueFromObject(commands, current)) !== CHAR_NOT_FOUND) current = null
      if (!current) return null

      if (current === key) instructions[current].push(instruction)
    })
  });
  return instructions;
}

// Example: gpon1/1 => { type: 'gpon', slot: 1, port: 1 }
const slitInterface = interface => {
  const match = interface.match(/(?<type>.*?)(?<slot>\d+?)\/(?<port>\d+?)/)

  const type = match.groups?.type || null;
  const slot = Number(match.groups?.slot) || null;
  const port = Number(match.groups?.port) || null;

  return [
    type,
    slot,
    port,
  ]
}

// Example: 10 km => 10000
const km2meters = (km = '0 km') => {
  const KM_TO_METERS = 1000;
  return (Number(km.replace('km', '').trim()) || 0) * KM_TO_METERS
}

const columnTraversal = (matrix, delimiter = '|') => {
  const headers = matrix[0].split('|');

  return result = matrix.slice(1).map(row => {
    const values = row.split('|');
    const data = {};
  
    headers.forEach((key, index) => {
      data[text2label(key)] = values[index];
    });

    return data;
  });
}

module.exports = {
  // functions
  expandVlans,
  removeJunksFromResponse,
  splitResponseByCommands,
  splitResponse,
  slitInterface,
  km2meters,
  columnTraversal,

  // constants
  INTERFACE_SPLIT,
  ONU_STATUS,
  PON_STATUS,
  JUNKS,
}
