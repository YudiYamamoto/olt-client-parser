const { connect } = require('../../../../../config/ssh-connect')
const { dummy2json } = require('../../../../../utils/lib')

/*
VLAN ID Name                              State   Member ports                   
                                                  (u)-Untagged, (t)-Tagged
======= ================================= ======= ========================
1       default                           ACTIVE  XE0/1(u) XE0/2(u) XE0/3(u) 
                                                  XE0/4(u) GPON1/1(u) GPON1/2(u) 
                                                  GPON1/3(u) GPON1/4(u) 
                                                  GPON1/5(u) GPON1/6(u) 
                                                  GPON1/7(u) GPON1/8(u) 
                                                  GPON1/9(u) GPON1/10(u) 
                                                  GPON1/11(u) GPON1/12(u) 
                                                  GPON1/13(u) GPON1/14(u) 
                                                  GPON1/15(u) GPON1/16(u) 
                                                  GPON2/1(u) GPON2/2(u) 
                                                  GPON2/3(u) GPON2/4(u) 
                                                  GPON2/5(u) GPON2/6(u) 
                                                  GPON2/7(u) GPON2/8(u) 
                                                  GPON2/9(u) GPON2/10(u) 
                                                  GPON2/11(u) GPON2/12(u) 
                                                  GPON2/13(u) GPON2/14(u) 
                                                  GPON2/15(u) GPON2/16(u) 
10      [E]                               ACTIVE  XE0/3(t) GPON1/1(t) GPON1/2(t) 
                                                  GPON1/3(t) GPON1/4(t) 
                                                  GPON1/5(t) GPON1/6(t) 
                                                  GPON1/7(t) GPON1/8(t) 
                                                  GPON1/9(t) GPON1/10(t) 
                                                  GPON1/11(t) GPON1/12(t) 
                                                  GPON1/13(t) GPON1/14(t) 
                                                  GPON1/15(t) GPON1/16(t) 
                                                  GPON2/1(t) GPON2/2(t) 
                                                  GPON2/3(t) GPON2/4(t) 
                                                  GPON2/5(t) GPON2/6(t) 
                                                  GPON2/7(t) GPON2/8(t) 
                                                  GPON2/9(t) GPON2/10(t) 
                                                  GPON2/11(t) GPON2/12(t) 
                                                  GPON2/13(t) GPON2/14(t) 
                                                  GPON2/15(t) GPON2/16(t) 
11      [E]                               ACTIVE  
33      [E]                               ACTIVE  
35      [E]                               ACTIVE  
36      [E]                               ACTIVE  
37      [E]                               ACTIVE  
57      [E]                               ACTIVE  
62      [E]                               ACTIVE  
99      [E]                               ACTIVE  XE0/1(t) GPON1/1(t) GPON1/2(t) 
                                                  GPON1/3(t) GPON1/4(t) 
                                                  GPON1/5(t) GPON1/6(t) 
                                                  GPON1/7(t) GPON1/8(t) 
                                                  GPON1/9(t) GPON1/10(t) 
                                                  GPON1/11(t) GPON1/12(t) 
                                                  GPON1/13(t) GPON1/14(t) 
                                                  GPON1/15(t) GPON1/16(t) 
                                                  GPON2/1(t) GPON2/2(t) 
                                                  GPON2/3(t) GPON2/4(t) 
                                                  GPON2/5(t) GPON2/6(t) 
                                                  GPON2/7(t) GPON2/8(t) 
                                                  GPON2/9(t) GPON2/10(t) 
                                                  GPON2/11(t) GPON2/12(t) 
                                                  GPON2/13(t) GPON2/14(t) 
                                                  GPON2/15(t) GPON2/16(t) 
110     UPLINK-CJP                        ACTIVE  XE0/2(t) 
450     GER-TN-OLT                        ACTIVE  XE0/4(t) 
556     CGNAT-CJP-TN                      ACTIVE  XE0/2(t) 
815     UPLINK-VIA-SANTOAMARO             ACTIVE  XE0/2(t) 
857     GD_VL857                          ACTIVE  XE0/1(t) GPON1/7(t) 
862     GD_VL852                          ACTIVE  XE0/1(t) GPON1/7(t) 
869     GD_VL869                          ACTIVE  XE0/1(t) GPON1/9(t) 
981     SANTOANDRE_SEMTERRA               ACTIVE  XE0/1(t) GPON1/1(t) 
1733    WCS-SANTAMARCELINA                ACTIVE  XE0/3(t) GPON1/16(t) 
1735    ONU-RIOFUNDO                      ACTIVE  XE0/3(t) GPON1/14(t) 
1736    ONU-ALCATEC                       ACTIVE  XE0/3(t) GPON1/7(t) 
1737    BB-AVANZA-PDN                     ACTIVE  XE0/3(t) GPON1/3(t) 
2401                                      ACTIVE  XE0/1(t) GPON1/1(t) 
2402                                      ACTIVE  XE0/1(t) GPON1/2(t) 
2403                                      ACTIVE  XE0/1(t) GPON1/3(t) 
2404                                      ACTIVE  XE0/1(t) GPON1/4(t) 
2405                                      ACTIVE  XE0/1(t) GPON1/5(t) 
2406                                      ACTIVE  XE0/1(t) GPON1/6(t) 
2407                                      ACTIVE  XE0/1(t) GPON1/7(t) 
2408                                      ACTIVE  XE0/1(t) GPON1/8(t) 
2409                                      ACTIVE  XE0/1(t) GPON1/9(t) 
2410                                      ACTIVE  XE0/1(t) GPON1/10(t) 
2411                                      ACTIVE  XE0/1(t) GPON1/11(t) 
2412                                      ACTIVE  XE0/1(t) GPON1/12(t) 
2413                                      ACTIVE  XE0/1(t) GPON1/13(t) 
2414                                      ACTIVE  XE0/1(t) GPON1/14(t) 
2415                                      ACTIVE  XE0/1(t) GPON1/15(t) 
2416                                      ACTIVE  XE0/1(t) GPON1/16(t) 
2417                                      ACTIVE  XE0/1(t) GPON2/1(t) 
2418                                      ACTIVE  XE0/1(t) GPON2/2(t) 
2419                                      ACTIVE  XE0/1(t) GPON2/3(t) 
2420                                      ACTIVE  XE0/1(t) GPON2/4(t) 
2421                                      ACTIVE  XE0/1(t) GPON2/5(t) 
2422                                      ACTIVE  XE0/1(t) GPON2/6(t) 
2423                                      ACTIVE  XE0/1(t) GPON2/7(t) 
2424                                      ACTIVE  XE0/1(t) GPON2/8(t) 
2425                                      ACTIVE  XE0/1(t) GPON2/9(t) 
2426                                      ACTIVE  XE0/1(t) GPON2/10(t) 
2427                                      ACTIVE  XE0/1(t) GPON2/11(t) 
2428                                      ACTIVE  XE0/1(t) GPON2/12(t) 
2429                                      ACTIVE  XE0/1(t) GPON2/13(t) 
2430                                      ACTIVE  XE0/1(t) GPON2/14(t) 
2431                                      ACTIVE  XE0/1(t) GPON2/15(t) 
2432                                      ACTIVE  XE0/1(t) GPON2/16(t) 
*/

const displayVlan = async (options, name) => {
  const conn = await connect(options)
  const cmd = `enable
show vlan ${name}`
  const chunk = await conn.exec3(cmd)
  
  const splitted = chunk.split('\r\n')
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.shift()
  splitted.pop()
  splitted.pop()

  const columns = [
    [0, 8],
    [8, 42],
    [42, 50],
    [50, 81],
  ]

  const data = dummy2json(splitted.join('\n'), columns, 2)

  const [vlan] = data
    .filter((item) => item['vlanid_======='] !== '')
    .map((item) => ({
      name: item['vlanid_======='], 
      description: item['name_================================='],
      custom_fields: {
        ...item
      }
    }))
  return vlan
}
module.exports = displayVlan