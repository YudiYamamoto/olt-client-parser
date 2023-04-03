const generic = require('./_generic')
const C300 = require('./C300')
const C320 = require('./C300')
const C650 = require('./C650')

module.exports = {
  generic,
  'C300': {
    ...Object.assign(generic, C300),
    options: {
      params: {
        numberPort: 16
      }
    }
  },
  'C320': {
    ...Object.assign(generic, C320),
    options: {
      params: {
        numberPort: 16
      }
    }
  }, 
  'C650': {
    ...Object.assign(generic, C650),
    options: {
      params: {
        numberPort: 16
      }
    }
  }, 
  options: {
    
  }
}