'use strict'
const OLTClientParser = require('../src/index')

const olt = new OLTClientParser({
  brand: 'Huawei',
  model: 'MA5608C',
  firmware: 1.9,
  options: {
    host: '10.11.105.2',
    port: 23,
    username: 'made4it',
    password: 'made4olt',
  }
});

(async () => {
  const data = await olt.displayPermissionByUser('made4it')
  console.log(data)
})();

(async () => {
  const data = await olt.displayBoard(0)
  console.log(data)  
})();
