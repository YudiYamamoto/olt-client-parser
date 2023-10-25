'use strict'
const OLTClientParser = require('../index')

const olt = new OLTClientParser({
 name: 'JP-PINHEIRO',
 brand: 'Huawei',
 model: 'Huawei_MA5603T',
 firmware: 'FMA5600V800R017C00',
 connectionType: 'ssh',
 options: {
   host: 'localhost',
   port: 2222,
   username: 'sysravi',
   password: 'v4497270',
   shellPrompt: '*',
   algorithms: { cipher: ['aes256-cbc'] },
 }
});

// const olt = new OLTClientParser({
//   name: 'DATACOM',
//   brand: 'DATACOM',
//   model: 'DATACOM',
//   firmware: 'DATACOM',
//   connectionType: 'ssh',
//   options: {
//     host: '177.128.199.14',
//     port: 6002,
//     username: 'admin',
//     password: 'Made4Olt748205@',
//     shellPrompt: 'OLT_Teste#',
//     algorithms: { cipher: ['aes192-ctr'] },
//   }
// });

/*
const olt = new OLTClientParser({
 name: 'TESTE',
 brand: 'ZTE',
 model: 'ZTE-C650',
 firmware: '1.2.1',
 connectionType: 'ssh',
 options: {
   host: '172.16.40.2',
   port: 22,
   username: 'made4olt',
   password: '0ltm@ad&@2023ZTE',
   shellPrompt: 'OLT-ANTAS-320',
 }
});
*/

// const olt = new OLTClientParser({
//  name: 'ADUSTINA',
//  brand: 'ZTE',
//  model: 'ZTE-C320',
//  firmware: '2.1.0',
//  connectionType: 'ssh',
//  options: {
//    host: '172.16.29.5',
//    port: 22,
//    username: 'made4olt2',
//    password: '0ltm@ad&@2023',
//    shellPrompt: 'ZTE-C320-ADT',
//    algorithms: { cipher: ['aes128-cbc', '3des-cbc'] }
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

// const olt = new OLTClientParser({
//   name: 'TESTE',
//   brand: 'Parks',
//   model: 'Parks_CGP802',
//   firmware: '6_0_2',
//   connectionType: 'ssh',
//   options: {
//     host: '10.61.61.87',
//     port: 22,
//     username: 'made4olt',
//     password: '0ltm@ad&@2023prks',
//   }
// });

(async () => {
  // const data = await olt.checkStage()
  const data = await olt.displayBoards()
  // const data = await olt.displaySlots({ board: '1' })
  // const data = await olt.displayPons({ board: '1', slot: '1' })
  // const data = await olt.displayPon({ pon_type: 'gpon', board: '1', slot: '1', port: '1' })
  // const data = await olt.displayOnus({ board: '1', slot: '1', port: '1' })
  // const data = await olt.displayOnu({ board: '1', slot: '1', port: '1', ont_id: '2', serial_number: 'prks00b80c94' })
  // const data = await olt.showOpticalModuleInfo({ board: '1', slot: '1', port: '1', ont_id: '2' }) // deprecated
  // const data = await olt.displayVlans()
  // const data = await olt.displayVlan('140')
  // const data = await olt.displayUplinks()
  // const data = await olt.displayDbaProfiles()
  // const data = await olt.displayLineProfiles() /** Verificar ZTE e Huawei */
  
  // const data = await olt.displayOLTServiceProfiles()
  // const data = await olt.displayUnconfiguredOnus()

  // const data = await olt.createOnu({ board: '0', slot: '0', port: '0', ont_id: '0'})
  // const data = await olt.createOnu({ board: '1', slot: '1', port: '1', ont_id: '19'}) //DATACOM
    // const data = await olt.deleteOnu({ servicePort: '1234', board: '1', slot: '1', port: '1', ont_id: '17'}) //DATACOM
    // const data = await olt.deleteOnu({ board: '1', slot: '1', port: '1', ont_id: '19'})

  // const data = await olt.displayOnuProfiles() /** Verificar ZTE e Huawei */
  // const data = await olt.displayTraffic({ type: 'gpon', board: '1', slot: '1', port: '15', ont_id: '41' }) // *

  // const data = await olt.scopeVlanLanToLan()
  // const data = await olt.createVlan({ vlan: 147, description: 'TESTE-DATACOM' })
  // const data = await olt.deleteVlan(147);
  // const data = await olt.deleteVlan({ vlan: 669 }); // Parks
  // const data = await olt.vlanTag({ interface: 'gpon', board: '1', slot: '1', port: '1', vlan: 147 })
  // const data = await olt.vlanUntag({ interface: 'gigabit-ethernet', board: '1', slot: '1', port: '1', vlan: 147 })
  // const data = await olt.vlanTag({ interface: 'giga-ethernet0/1', vlan: 117 }) // Parks
  // const data = await olt.vlanUntag({ interface: 'giga-ethernet0/0', vlan: 669 }) // Parks
  // const data = await olt.showInterfaceOpticalModuleInfo('xgei-1/5/1')
  // const data = await olt.showVlanPort({ interface: 'giga-ethernet0/1' }) // Parks
  // const data = await olt.removeVlanUplink('gigabit-ethernet-1/1/1')
  // const data = await olt.removeVlanUplink({ interface:'gigabit-ethernet', board: '1', slot: '1', port: '1', vlan: 147 })
  // const data = await olt.enableAutoNegotiation({ interface: 'gigabit-ethernet', board: '1', slot: '1', port: '1' })
  // const data = await olt.enableAutoNegotiation({ interface: 'giga-ethernet0/0' }) // Parks
  // const data = await olt.disableAutoNegotiation({ interface: 'gigabit-ethernet' , board: '1', slot: '1', port: '1' })
  // const data = await olt.enableTrunkMode({ interface: 'giga-ethernet0/0', mode: 'access' })

  // const data = await olt.displaySpeedProfiles()
  // const data = await olt.disableUplink({ type: 'mcu', board: '0', slot: '2', port: '0' })
  // const data = await olt.disableUplink({ interface: 'gigabit-ethernet', board: '1', slot: '1', port: '1' }) // //DATACOM
  // const data = await olt.enableUplink({ type: 'mcu', board: '0', slot: '2', port: '0' })
  // const data = await olt.enableUplink({ interface: 'gigabit-ethernet', board: '1', slot: '1', port: '1' }) //DATACOM
  // const data = await olt.disableUplink({ interface: 'giga-ethernet0/0' }) // Parks
  // const data = await olt.enableUplink({ interface: 'giga-ethernet0/0' }) // Parks
  // const data = await olt.runCommand('show pon power attenuation gpon_onu-1/1/16:1');
  // const data = await olt.disablePon({ type: 'gpon', board: '0', slot: '0', port: '0' })
  // const data = await olt.disablePon({ board: '1', slot: '1', port: '1' }) //DATACOM
  // const data = await olt.enablePon({ type: 'gpon', board: '0', slot: '0', port: '0' })
  // const data = await olt.enablePon({board: '1', slot: '1', port: '1' }) //DATACOM
  // const data = await olt.disablePon({ interface: 'gpon1/1' })
  // const data = await olt.enablePon({ interface: 'gpon1/1' })
  // const data = await olt.createDbaProfile({ name: 'DBA_TEST_TYPE_4', type: 4, speed: 51200 });
  // const data = await olt.createSrvProfile({ profile_name: 'SRV_PROFILE_TEST_3', vlan: '669' });
  // const data = await olt.createSrvProfile({ service_profile: 'SERVICE_PROFILE_NODE', onu_profile: 'ONU-GENERICA' }); //DATACOM

  console.log(data);
})()
