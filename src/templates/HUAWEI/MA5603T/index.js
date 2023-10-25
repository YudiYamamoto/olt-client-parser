const F1_9_0 = require('./F1_9_0')
const FMA5600V800R015C00 = require('./FMA5600V800R017C00')
const FMA5600V800R018C10 = require('./FMA5600V800R018C10')
const FMA5600V800R017C10 = require('./FMA5600V800R018C10')

module.exports = {
  F1_9_0,
  FMA5600V800R015C00,
  FMA5600V800R018C10,
  FMA5600V800R017C10: {
    ...FMA5600V800R017C10,
    ssh: {
      ...FMA5600V800R017C10.ssh,
      options: {
        algorithms: {
          cipher: [
            'aes128-cbc',
            '3des-cbc',
            'aes256-cbc'
          ],
        }
      }
    }
  }
}