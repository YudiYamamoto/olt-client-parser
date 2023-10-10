const { connect } = require('../../../../config/ssh-connect')
const { text2label, column2json, dummy2json } = require('../../../../utils/lib')
const {
  removeJunksFromResponse,
  splitResponseByCommands,
  slitInterface,
  columnTraversal,
  ONU_STATUS,
} = require('../../../../utils/parks')

//show gpon profile bandwidth
/**
10.61.61.87: terminal length 0
OLT-BJP#show gpon profile bandwidth
Name                             | Type         | Fixed    | Assured  | Maximum 
Gerencia                         | MANAGEMENT   | 0        | 1024     | 2048    
Internet                         | INTERNET     | 0        | 0        | 1024000 
Preset_99                        | INTERNET     | 0        | 0        | 24000   
OLT-BJP#
*/

module.exports = async (options) => {
  let response = await (await connect(options))
    .execParks(`show gpon profile bandwidth`)

  if (!response) return null

  response = response.split('\r\n')
  response.shift() // remove: 10.61.61.87: terminal length 0
  response.shift() // remove: OLT-BJP#show gpon profile bandwidth

  // Content
  response.pop() // remove: OLT-BJP#

  response = removeJunksFromResponse(response)

  const dbaProfiles = columnTraversal(response, '|');

  return dbaProfiles.map((dba) => ({
    name: dba.name, 
    type: dba.type,
    fixed: dba.fixed,
    assured: dba.assured,
    speed: dba.maximum,
    custom_fields: {
      ...dba,
    }
  }))
}
