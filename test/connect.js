'use strict'
const OLTClientParser = require('../index')

const olt = new OLTClientParser({
  name: 'TESTE',
  brand: 'Huawei',
  model: 'Huawei_MA5608T',
  firmware: 'MA5600V800R017C10', // 1.9.0
  // firmware: 'MA5600V800R018C10', // 1.9.0
  // firmware: 'MA5600V800R015C00', // 1.9.0
  connectionType: 'ssh',
  options: {
    host: '138.97.70.10',
    port: 2822,
    username: 'made4ont',
    password: 'made4olt',
    shellPrompt: 'MA5608T>',
  }
});

(async () => {
  console.log(new Date().getTime())
  // const data = await olt.checkStage()
  // const data = await olt.displayBoards()
  // const data = await olt.displaySlots({ board: '0' })
  // const data = await olt.displayPons({ board: '0', slot: '0' })
  // const data = await olt.displayPon({ board: '0', slot: '0', port: '7' })
  // const data = await olt.displayOnus({ board: '0', slot: '0', port: '0' })
  // const data = await olt.displayOnu({ board: '0', slot: '0', port: '0', ont_id: '0' })
  // const data = await olt.showOpticalModuleInfo() 
  // const data = await olt.displayVlans()
  // const data = await olt.displayVlan('109')
  // const data = await olt.displayUplinks()
  // const data = await olt.displayUnconfiguredOnus()
  // const data = await olt.displayDbaProfiles()
  const data = await olt.displayLineProfiles() /** Verificar ZTE e Huawei */
  // const data = await olt.displayOLTServiceProfiles()
  
  // const data = await olt.displayOnuProfiles() /** Verificar ZTE e Huawei */
  /// const data = await olt.displayTraffic({ type: 'gpon', board: '1', slot: '1', port: '15', ont_id: '41' }) // *

  // const data = await olt.scopeVlanLanToLan()
  // const data = await olt.createVlan({ vlan: '666', description: 'TESTE' })
  // const data = await olt.deleteVlan('666')
  // const data = await olt.vlanTag({ interface: 'xgei-1/5/2', vlan: '666'})
  // const data = await olt.vlanUntag({ interface: 'xgei-1/5/2', vlan: '666'})
  // const data = await olt.showInterfaceOpticalModuleInfo('xgei-1/5/1')
  // const data = await olt.showVlanPort('xgei-1/5/1')
  // const data = await olt.removeVlanUplink('xgei-1/5/2)
  // const data = await olt.enableAutoNegotiation('xgei-1/5/2')
  // const data = await olt.disableAutoNegotiation('xgei-1/5/2')
  // const data = await olt.enableTrunkMode('xgei-1/5/2')
  
  // const data = await olt.displaySpeedProfiles()
  // const data = await olt.disableUplink('10')
  // const data = await olt.enableUplink('10')  
  // const data = await olt.runCommand('show pon power attenuation gpon_onu-1/1/16:1');
  // await olt.disablePon({ type: 'gpon', board: '1', slot: '3', port: '12' })
  // await olt.enablePon({ type: 'gpon', board: '1', slot: '3', port: '12' })
  /*
  const data = await olt.createOnu({ 
    pon_type: 'gpon', 
    board: '1', 
    slot: '2', 
    port: '15', 
    ont_id: 4, 
    serial_number: '9AC29F6496FB', 
    onu_profile: 'PLANO-100U-100D-ONT420-10R',
    name: 'teste_comandos@made4it.com.br'
  })
  */
  console.log(data) 
  console.log(new Date().getTime())
})()
