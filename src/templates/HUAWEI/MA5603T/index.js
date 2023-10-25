const FMA5600V800R017C00 = require('./FMA5600V800R017C00')

module.exports = {
  FMA5600V800R017C00: {
    ...FMA5600V800R017C00,
    ssh: {
      ...FMA5600V800R017C00.ssh,
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