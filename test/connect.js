'use strict'
const OLTClientParser = require('../index')

const olt = new OLTClientParser({
  brand: 'ZTE',
  model: 'C650',
  firmware: '1_2_1',
  connectionType: 'telnet',
  options: {
    host: '177.155.144.1',
    port: 2023,
    username: 'smartoltusr',
    password: 'Mega@1926',
    shellPrompt: 'ZXAN#',
  }
});

/*
const olt = new OLTClientParser({
  brand: 'ZTE',
  model: 'C300',
  firmware: '2_1_0',
  connectionType: 'telnet',
  options: {
    host: '177.155.144.1',
    port: 2023,
    username: 'smartoltusr',
    password: 'Mega@1926',
    shellPrompt: 'ZXAN#',
  }
});
const olt = new OLTClientParser({
  brand: 'Furukawa',
  model: '3032',
  firmware: '2_0_9',
  connectionType: 'ssh',
  options: {
    host: '177.128.99.254',
    port: 3022,
    username: 'madegraph',
    password: '18012023',
    shellPrompt: 'OLT-3008-DATACIT-RET>',
  }
});


const olt = new OLTClientParser({
  brand: 'Furukawa',
  model: '3008',
  firmware: '1_09-0050',
  connectionType: 'ssh',
  options: {
    host: '177.128.99.254',
    port: 3022,
    username: 'madegraph',
    password: '18012023',
    shellPrompt: 'OLT-3008-DATACIT-RET>',
  }
});

const olt = new OLTClientParser({
  brand: 'Huawei',
  model: 'MA5608T',
  firmware: '1.9',
  connectionType: 'telnet',
  options: {
    host: '10.11.105.2',
    port: 23,
    username: 'made4it',
    password: 'made4olt',
    shellPrompt: 'ZAMPI>',
    // timeout: 10000
  }
});

(async () => {
  const data = await olt.displayPermissionByUser('made4it')
  console.log(data)
})()

(async () => {
  const data = await olt.enableRoot()
  console.log(data)  
})()

(async () => {
  const params = { board: 0, pon: 0 }
  const data = await olt.displayPon(params)
  console.log(data)  
})()

*/

(async () => {
  // const data = await olt.displayBoards()
  // const data = await olt.displaySlots({ board: '1' })
  const data = await olt.displayPons({ board: '1', slot: '1' })
  // const data = await olt.displayOnus({ board: '1', slot: '12', port: '1' })
  console.log(data)  
})()
