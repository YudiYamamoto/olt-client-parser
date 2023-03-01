const generic = require('./generic')
const OLT_3008 = require('./OLT-3008')

module.exports = {
  generic,
  3008: {
    ...Object.assign(generic, OLT_3008),
    options: {
      params: {
        numberPort: 16
      }
    }
  },  
  options: {
    
  }
}