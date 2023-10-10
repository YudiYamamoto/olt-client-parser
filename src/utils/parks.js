const {
  getNextValueFromObject,
  text2label,
  CHAR_NOT_FOUND,
} = require('./lib')

const ONU_STATUS = {
  'Active': 'online',
  // 'LOS': 'los', // TODO: verificar como fica em uma ONU com los
  // 'DyingGasp': 'pwr_fail', // TODO: verificar em uma ONU com power fail
}

const JUNKS = [
  '-----------------------------------------------------',
]

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
  slitInterface,
  columnTraversal,

  // constants
  ONU_STATUS,
  JUNKS,
}
