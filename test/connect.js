'use strict'
const OLTClientParser = require('../index')

// const olt = new OLTClientParser({
//   name: 'TESTE',
//   brand: 'Huawei',
//   model: 'Huawei_MA5608T',
//   firmware: 'MA5600V800R017C10', // 1.9.0
//   // firmware: 'MA5600V800R018C10', // 1.9.0
//   // firmware: 'MA5600V800R015C00', // 1.9.0
//   connectionType: 'ssh',
//   options: {
//     host: '138.97.70.10',
//     port: 2822,
//     username: 'made4ont',
//     password: 'made4olt',
//     shellPrompt: 'MA5608T>',
//   }
// });

// const olt = new OLTClientParser({
//  name: 'TESTE',
//  brand: 'ZTE',
//  model: 'ZTE-C320',
//  firmware: '2.1.0',
//  connectionType: 'ssh',
//  options: {
//    host: '172.16.29.2',
//    port: 22,
//    username: 'made4olt',
//    password: '0ltm@ad&@2023',
//    shellPrompt: 'OLT-ANTAS-320',
//  }
// });


// const olt = new OLTClientParser({
//   name: 'TESTE',
//   brand: 'Furukawa',
//   model: 'Furukawa_3032',
//   firmware: '2.0.9',
//   connectionType: 'ssh',
//   options: {
//     host: '10.232.69.34',
//     port: 22,
//     username: 'made4olt',
//     password: '0ltm@ad&@2023FKW',
//     shellPrompt: 'OLT-3032-CJP-JP-006[A]>',
//   }
// });

// const olt = new OLTClientParser({
//   name: 'TESTE',
//   brand: 'Parks',
//   model: 'Parks_CGP802',
//   firmware: '6_0_6',
//   connectionType: 'ssh',
//   options: {
//     host: '10.12.13.2',
//     port: 22,
//     username: 'made4it',
//     password: 'mudar@123',
//   }
// });

const olt = new OLTClientParser({
  name: 'TESTE',
  brand: 'Parks',
  model: 'Parks_CGP802',
  firmware: '6_0_2',
  connectionType: 'ssh',
  options: {
    host: '10.61.61.87',
    port: 22,
    username: 'made4olt',
    password: '0ltm@ad&@2023prks',
  }
});

(async () => {
  // const data = await olt.checkStage()
  // const data = await olt.displayBoards()
  // const data = await olt.displaySlots()
  // const data = await olt.displayPons({ board: '0', slot: '0' })
  // const data = await olt.displayPon({ board: '0', slot: '0', port: '7' })
  // const data = await olt.displayOnus({ board: '0', slot: '0', port: '0' })
  // const data = await olt.displayOnus({ interface: 'gpon1/1' }) // Parks
  // const data = await olt.displayOnu({ board: '0', slot: '0', port: '0', ont_id: '0' })
  // const data = await olt.displayOnu({ serial_number: 'prks00b80c94' }) // Parks
  // const data = await olt.showOpticalModuleInfo({ serial_number: 'prks00b80c94' })
  // const data = await olt.displayVlans()
  // const data = await olt.displayVlan('109')
  // const data = await olt.displayUplinks()
  // const data = await olt.displayUnconfiguredOnus()
  const data = await olt.displayDbaProfiles()
  // const data = await olt.displayLineProfiles() /** Verificar ZTE e Huawei */
  // const data = await olt.displayOLTServiceProfiles()
  
  // const data = await olt.displayOnuProfiles() /** Verificar ZTE e Huawei */
  /// const data = await olt.displayTraffic({ type: 'gpon', board: '1', slot: '1', port: '15', ont_id: '41' }) // *

  // const data = await olt.scopeVlanLanToLan()
  // const data = await olt.createVlan({ vlan: 147, description: 'TESTE' })
  // const data = await olt.deleteVlan(669);
  // const data = await olt.deleteVlan({ vlan: 669 }); // Parks
  // const data = await olt.vlanTag({ board: '0', slot: '2', port: '0', vlan: 669 })
  // const data = await olt.vlanUntag({ board: '0', slot: '2', port: '0', vlan: 669 })
  // const data = await olt.vlanTag({ interface: 'giga-ethernet0/1', vlan: 117 }) // Parks
  // const data = await olt.vlanUntag({ interface: 'giga-ethernet0/0', vlan: 669 }) // Parks
  // const data = await olt.showInterfaceOpticalModuleInfo('xgei-1/5/1')
  // const data = await olt.showVlanPort('xgei-1/5/1')
  // const data = await olt.showVlanPort({ interface: 'giga-ethernet0/1' }) // Parks
  // const data = await olt.removeVlanUplink('xgei-1/5/2)
  // const data = await olt.enableAutoNegotiation({ type: 'mcu', board: '0', slot: '2', port: '0' })
  // const data = await olt.enableAutoNegotiation({ interface: 'giga-ethernet0/0' }) // Parks
  // const data = await olt.disableAutoNegotiation({ type: 'mcu', board: '0', slot: '2', port: '0' })
  // const data = await olt.enableTrunkMode('xgei-1/5/2')
  // const data = await olt.enableTrunkMode({ interface: 'giga-ethernet0/0', mode: 'access' }) // Parks
  
  // const data = await olt.displaySpeedProfiles()
  // const data = await olt.disableUplink({ type: 'mcu', board: '0', slot: '2', port: '0' })
  // const data = await olt.enableUplink({ type: 'mcu', board: '0', slot: '2', port: '0' })
  // const data = await olt.disableUplink({ interface: 'giga-ethernet0/0' }) // Parks
  // const data = await olt.enableUplink({ interface: 'giga-ethernet0/0' }) // Parks
  // const data = await olt.runCommand('show pon power attenuation gpon_onu-1/1/16:1');
  // const data = await olt.disablePon({ type: 'gpon', board: '0', slot: '0', port: '0' })
  // const data = await olt.enablePon({ type: 'gpon', board: '0', slot: '0', port: '0' })
  // const data = await olt.disablePon({ interface: 'gpon1/1' })
  // const data = await olt.enablePon({ interface: 'gpon1/1' })
  // const data = await olt.createDbaProfile({ name: 'DBA_TEST_TYPE_4', type: 4, speed: 51200 });
  // const data = await olt.createSrvProfile({ profile_name: 'SRV_PROFILE_TEST_3', vlan: '669' });

  console.log(data);
})()
