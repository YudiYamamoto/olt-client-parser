const { connect } = require('../../../../config/ssh-connect')
const { dummy2json } = require('../../../../utils/lib')

/*
                          UPSTREAM         BANDWIDTH        GEM                                         MAPPING     PORT       VLAN       COS             COS          VEIP  VLAN       COS
NAME                       FEC       TCONT  PROFILE          ID   TCONT  PRIORITY  GEM TRAFFIC PROFILE   NAME        VAL   ANY  VAL   ANY  VAL  ANY  VLAN  VAL     ANY  IDX   VAL   ANY  VAL   ANY
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
LINE_PLANO_100MB           true      1      DBA_UPLOAD_100M  1    1      -         DOWNLOAD_PLANO_100MB  PPPoE       -     X    201   -    -    X
ONU-PROFILE-GERAL          true      1      MAX_200M         1    1      -         DOWNLOAD_PLANO_100MB  ONU-Bridge  -     X    -     X    -    X
                                                                                                        ONU-WiFi    -     -    -     -    -    -                       1     -     X    -     X
ONU_NOKIA_TPLINK_VLAN_141  true      1      MAX_200M         1    1      0         -                     ONU-WiFi    -     -    -     -    -    -                       1     141   -    -     X
PON1_BRIDGE                true      1      MAX_350M         1    1      0         -                     PPPoE       -     X    201   -    -    X
*/


const displayLineProfiles = async (options) => {
const cmd = 'show running-config profile gpon line-profile | nomore | tab'
const conn = await connect(options)
const chunk = await conn.execDatacom(cmd)
if (!chunk && chunk === '') return null

const splitted = chunk.split('\r\n')
splitted.shift()
splitted.pop()
splitted.pop()
///                                                                                                                     ETH        ETH        ETH             IPHOST             VEIP       VEIP       ',
//                            UPSTREAM         BANDWIDTH        GEM                                         MAPPING     PORT       VLAN       COS             COS          VEIP  VLAN       COS        ',
// NAME                       FEC       TCONT  PROFILE          ID   TCONT  PRIORITY  GEM TRAFFIC PROFILE   NAME        VAL   ANY  VAL   ANY  VAL  ANY  VLAN  VAL     ANY  IDX   VAL   ANY  VAL   ANY  ',
const columns = [
  [0, 27],
  [27, 37],
  [37, 44],
  [44, 61],
  [61, 66],
  [66, 73],
  [73, 83],
  [83, 105],
  [105, 117],
  [117, 122],
  [128, 134],
  [174, 180],
]

const data = dummy2json(splitted.join('\n'), columns, 3)
return data
  .map((item) =>  {      
    return {
      name: item.name || '',
      tconts: [{
        name: item.tcont || '',
        dba_profile: item.bandwidth_profile || '',
        gems: [{
          name: item.gem_id || '',
          type: item.gem_id || '',
        }],
        custom_fields: {
          ...item
        }
      }],
      custom_fields: {
        ...item
      }
    }
  })
  .filter((item) => item.name !== '')
}

module.exports = displayLineProfiles