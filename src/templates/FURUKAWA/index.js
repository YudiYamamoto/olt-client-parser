const generic = require('./_generic')
const OLT_3008 = require('./3008')
const OLT_3016 = require('./3008')
const OLT_3032 = require('./3032')

module.exports = {
  generic,
  '3008': {
    ...Object.assign(generic, OLT_3008),
    options: {
      params: {
        numberPort: 8
      }
    }
  },
  '3016': {
    ...Object.assign(generic, OLT_3016),
    options: {
      params: {
        numberPort: 16
      }
    }
  },
  '3032': {
    ...Object.assign(generic, OLT_3032),
    options: {
      params: {
        numberPort: 32
      }
    }
  }, 
  options: {
    
  }
}