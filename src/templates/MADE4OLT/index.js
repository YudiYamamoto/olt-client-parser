const generic = require('./_generic')

module.exports = {
  generic,
  'FKW_3008': {
    ...generic,
    options: {
      params: {
        numberPort: 8
      }
    }
  },  
  'ZTE_C650': {
    ...generic,
    options: {
      params: {
        numberPort: 16
      }
    }
  }, 
  options: {
  }
}