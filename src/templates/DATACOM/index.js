const generic = require('./_generic')
// const DATACOM = require('./DATACOM')

module.exports = {
  generic,
  'DATACOM': {
    ...generic,
    options: {
      params: {
        numberPort: 16
      }
    }
  },  
}
