const generic = require('./_generic')

module.exports = {
  generic,
  'Furukawa_3008': {
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
  'Huawei_MA4608T': {
    ...generic,
    options: {
      params: {
        numberPort: 16
      }
    }
  }, 
  'Vsol_V1600g1': {
    ...generic,
    options: {
      params: {
        numberPort: 8
      }
    }
  }, 
  'Datacom_DM4615': {
    ...generic,
    options: {
      params: {
        numberPort: 16
      }
    }
  }, 
  'Nokia_7360FX16': {
    ...generic,
    options: {
      params: {
        numberPort: 16
      }
    }
  }, 
  'FiberHome_AN5516P06': {
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