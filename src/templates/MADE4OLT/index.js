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
  'HWI_MA4608T': {
    ...generic,
    options: {
      params: {
        numberPort: 16
      }
    }
  }, 
  'VSL_V1600g1': {
    ...generic,
    options: {
      params: {
        numberPort: 8
      }
    }
  }, 
  'DCM_DM4615': {
    ...generic,
    options: {
      params: {
        numberPort: 16
      }
    }
  }, 
  'NKA_7360FX16': {
    ...generic,
    options: {
      params: {
        numberPort: 16
      }
    }
  }, 
  'FBH_AN5516P06': {
    ...generic,
    options: {
      params: {
        numberPort: 6
      }
    }
  }, 
  options: {
  }
}