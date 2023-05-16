const { line2json, column2json, filterLine } = require('../../../../utils/lib')
const chance = require('chance').Chance()

const showOpticalModuleInfo = async (_options, interface) => {
  const chunk = `IRARA-OLT#show optical-module-info ${interface} 
Optical Module Position    : ${interface}
Optical Module Power State : on
Optical Module State       : online                                             
                          
--------------------------------------------------------------------------------
Optical Module Manufacture Information:
--------------------------------------------------------------------------------
Vendor-Name    : CISCO-PRE                Product-Name   : PRE-SFP10G-SR
Sequence-Number: ${chance.geohash({ length: 10 })}               Version-Level  : 1.0
Product-Date   : ${chance.date({ string: true, american: false }).replace(/\//gi, '')}                   
Part-Number    : 
Material-Number: 5a 54 45 57 41 38 4e 43 41 41
                  31 30 2d 32 34 31 35 00 00 00                    
Register-Data  : 03 04 07 10 00 00 00 00 00 00 00 06 67 00 00 00
                  1e 1e 00 00 43 49 53 43 4f 2d 50 52 45 20 20 20
                  20 20 20 20 00 a8 29 4c 50 52 45 2d 53 46 50 31
                  30 47 2d 53 52 20 20 20 31 2e 30 20 03 52 00 24
                  00 1a 00 00 42 43 31 36 30 36 31 37 36 36 32 20
                  20 20 20 20 31 36 30 36 32 30 20 20 68 f0 01 da
                  00 00 02 8e c5 5f ca 49 19 83 bb 75 79 36 c6 3a
                  6c f1 45 00 00 00 00 00 00 00 00 00 7f 06 d1 00
--------------------------------------------------------------------------------
Optical Module Information:           
--------------------------------------------------------------------------------
Module-Type    : 10GBASE_SR          Supply-Vol     : 3.223(v)    [3.0, 3.6]
Connector      : LC                  Temperature    : 37.000(c)   [-45.0, 90.0]
Fiber-Type     : MM                  RxPower        : -2.833(dbm) [-10.0, -1.0]
Trans-Distance : 30(m) for OM1 62.5 um fiber.30(m) for OM2 50 um fiber.N/A      
                
--------------------------------------------------------------------------------
Optical Transmitter Information:      
--------------------------------------------------------------------------------
Laser-Rate     : 103  (100Mb/s)      TxPower        : -2.093(dbm) [-7.3, -1.0]
Wavelength     : 850  (nm)           TxBias-Current : 6.666(mA)   [0.0, 131.0]  
                    
--------------------------------------------------------------------------------
Optical Module Alarm Threshold:       
--------------------------------------------------------------------------------
RxPower-Upper    : 3  (dbm)          RxPower-Lower    : -20(dbm)
TxPower-Upper    : 9.000 (dbm)       TxPower-Lower    : -14.000(dbm)
Bias-Upper       : 131(mA)           Bias-Lower       : 0(mA)
Voltage-Upper    : 7  (v)            Voltage-Lower    : 0(v)
Temperature-Upper: 90 (c)            Temperature-Lower: -45(c)
Module-Class     : default   `
  const lines = chunk.split('\n')
  lines.shift()
  const head = column2json(lines.slice(0, 3))
  const check_omi = lines.findIndex(item => item.startsWith('Optical Module Information:'))
  const [ommi1, ommi2, ommi3, ommi4] = filterLine(lines, 7, check_omi - 1)

  const check_oti = lines.findIndex(item => item.startsWith('Optical Transmitter Information:'))
  const [trans_distance, ...rest_optical_module_information] = filterLine(lines, check_omi + 2, check_oti - 1).reverse()
  const optical_module_information = { ...column2json([trans_distance]), ...line2json(rest_optical_module_information, 37) }
  const check_omat = lines.findIndex(item => item.startsWith('Optical Module Alarm Threshold:'))
  const optical_transmitter_information = line2json(filterLine(lines, check_oti + 2, check_omat - 1), 37)
  const optical_module_alarm_threshold = line2json(filterLine(lines, check_omat + 2), 37)
  // lines.pop()
  const optical_module_manufacture_information = line2json([ommi1, ommi2, ommi3, ommi4], 37)
  
  const data = {
    ...head,
    ...optical_module_information,
    ...optical_transmitter_information,
    ...optical_module_alarm_threshold,
    ...optical_module_manufacture_information
  }

  data.tx_power = parseFloat((data.tx_power || '').toLowerCase().replace('dbm', '').trim().replace(/ /gi, ''), 10)
  data.rx_power = parseFloat((data.rx_power || '').toLowerCase().replace('dbm', '').trim().replace(/ /gi, ''), 10)
  data.wavelength = parseFloat((data.wavelength || '').toLowerCase().replace('(nm)', '').trim().replace(/ /gi, ''), 10)
  data.temperature = parseFloat((data.temperature || '').toLowerCase().split('(c)')[0].trim().replace(/ /gi, ''), 10)

  return data
}

module.exports = showOpticalModuleInfo
