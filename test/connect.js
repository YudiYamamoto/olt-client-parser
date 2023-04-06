'use strict'
const OLTClientParser = require('../index')


/*
// FURUKAWA 3008
const olt = new OLTClientParser({
  brand: 'Furukawa',
  model: '3008',
  firmware: '1.0.2',
  connectionType: 'ssh',
  options: {
    host: '177.128.99.254',
    port: 3022,
    username: 'madegraph',
    password: '18012023',
    shellPrompt: 'OLT-3008-DATACIT-RET>',
  }
});

// FURUKAWA 3032
const olt = new OLTClientParser({
  brand: 'Furukawa',
  model: '3032',
  firmware: '2.0.9',
  connectionType: 'ssh',
  options: {
    host: '186.232.56.242',
    port: 3022,
    username: 'madegraph',
    password: 'made@graph1',
    shellPrompt: 'FKW-AVANZA-3032[A]>',
  }
});

// ZTE C650
const olt = new OLTClientParser({
  brand: 'ZTE',
  model: 'C650',
  firmware: '1.2.1',
  connectionType: 'ssh',
  options: {
    host: '177.128.99.254',
    port: 3050,
    username: 'madegraph',
    password: 'Made@graph1',
    shellPrompt: 'IRARA-OLT#',
    __extra__: {
      onu: {
        size: 3
      }
    }
  }
});


const olt = new OLTClientParser({
  brand: 'ZTE',
  model: 'C320',
  firmware: '2.1.0',
  connectionType: 'ssh',
  options: {
    host: '177.155.144.1',
    port: 3051,
    username: 'madegraph',
    password: 'Made@graph1',
    shellPrompt: 'ZXAN#',
    __extra__: {
      onu: {
        size: 3
      }
    }
  }
});
*/

/*
// HUAWEI MA5608T
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

/*
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
  // const data = await olt.displayPons({ board: '1', slot: '1' })
  // const data = await olt.displayOnus({ board: '1', slot: '1', port: '16' })
  // console.log(data)  
})()
