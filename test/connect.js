'use strict'
const OLTClientParser = require('../index')

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const olt = new OLTClientParser({
  brand: 'ZTE',
  model: 'C300',
  firmware: '2.1.0',
  connectionType: 'ssh',
  options: {
    host: '172.16.29.6',
    port: 22,
    username: 'made4olt',
    password: '0ltm@ad&@2023',
    shellPrompt: 'SQUINTO-OLT-C320#',
  }
});

(async () => {
  console.log(new Date().getTime())
  // const data = await olt.checkStage()
  // const data = await olt.displayBoards()
  // const data = await olt.displaySlots({ board: '1' })
  // const data = await olt.displayPons({ board: '1', slot: '3' })
  const data = await olt.displayPon({ board: '1', slot: '3', port: '1' })
  // const data = await olt.displayOnus({ board: '1', slot: '1', port: '15' })
  // const data = await olt.displayOnu({ board: '1', slot: '1', port: '15', ont_id: '13' })
  // const data = await olt.showOpticalModuleInfo({ board: '1', slot: '2', port: '7', ont_id: '25' })
  // const data = await olt.displayVlans()
  // const data = await olt.displayVlan('2431')
  // const data = await olt.displayUplinks()
  // const data = await olt.displayUnconfiguredOnus()
  // const data = await olt.displayOnuProfiles()
  // const data = await olt.displayDbaProfiles()
  // const data = await olt.displayLineProfiles()
  // const data = await olt.displayTraffic({ type: 'gpon', board: '1', slot: '1', port: '15', ont_id: '41' })
  // const data = await olt.displayOLTServiceProfiles({ board: '1', slot: '1', port: '1' })

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
  console.table(data) 
  console.log(new Date().getTime())
})()
