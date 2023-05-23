const generic = require('./_generic')

module.exports = {
  generic,
  'FURUKAWA_3008': {
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
  'HUAWEI_MA4608T': {
    ...generic,
    options: {
      params: {
        numberPort: 16
      }
    }
  }, 
  'VSOL_V1600G1': {
    ...generic,
    options: {
      params: {
        numberPort: 8
      }
    }
  }, 
  'DATACOM_DM4615': {
    ...generic,
    options: {
      params: {
        numberPort: 16
      }
    }
  }, 
  'NOKIA_7360FX16': {
    ...generic,
    options: {
      params: {
        numberPort: 16
      }
    }
  }, 
  'FIBERHOME_AN5516P06': {
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