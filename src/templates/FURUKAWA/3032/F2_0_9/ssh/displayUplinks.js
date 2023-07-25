const { connect } = require('../../../../../config/ssh-connect')
const { dummy2json } = require('../../../../../utils/lib')

/* >>> Coletar os numero de ports
OLT-DATACIT-TN01[A]> show  interface-status
---------------------------------------------------------------------------
 INTERFACE   TYPE     ADMIN OPER  NEGO   SET-SPEED   CUR-SPEED  FLOWCTRL
---------------------------------------------------------------------------
  XE0/1      XE-FX     Up    Up   Force   10G/Force   10G/Full   Off   
  XE0/2      XE-FX     Up   Down  Force  1000/Force     0/Full   Off   
  XE0/3      XE-FX     Up    Up   Auto   1000/Auto   1000/Half   Off   
  XE0/4      XE-FX     Up   Down  Force  1000/Force     0/Full   Off   
---------------------------------------------------------------------------
  GPON1/1    GPON      Up    Up   Force  2500/Force  2500/Full   Off   
  GPON1/2    GPON      Up    Up   Force  2500/Force  2500/Full   Off   
  GPON1/3    GPON      Up    Up   Force  2500/Force  2500/Full   Off   
  GPON1/4    GPON      Up    Up   Force  2500/Force  2500/Full   Off   
  GPON1/5    GPON      Up    Up   Force  2500/Force  2500/Full   Off   
  GPON1/6    GPON      Up    Up   Force  2500/Force  2500/Full   Off   
  GPON1/7    GPON      Up    Up   Force  2500/Force  2500/Full   Off   
  GPON1/8    GPON      Up    Up   Force  2500/Force  2500/Full   Off   
  GPON1/9    GPON      Up    Up   Force  2500/Force  2500/Full   Off   
  GPON1/10   GPON      Up    Up   Force  2500/Force  2500/Full   Off   
  GPON1/11   GPON      Up    Up   Force  2500/Force  2500/Full   Off   
  GPON1/12   GPON      Up    Up   Force  2500/Force  2500/Full   Off   
  GPON1/13   GPON      Up    Up   Force  2500/Force  2500/Full   Off   
  GPON1/14   GPON      Up    Up   Force  2500/Force  2500/Full   Off   
  GPON1/15   GPON      Up    Up   Force  2500/Force  2500/Full   Off   
  GPON1/16   GPON      Up    Up   Force  2500/Force  2500/Full   Off   
---------------------------------------------------------------------------
  GPON2/1    GPON      Up    Up   Force  2500/Force  2500/Full   Off   
  GPON2/2    GPON      Up    Up   Force  2500/Force  2500/Full   Off   
  GPON2/3    GPON      Up    Up   Force  2500/Force  2500/Full   Off   
  GPON2/4    GPON      Up    Up   Force  2500/Force  2500/Full   Off   
  GPON2/5    GPON      Up    Up   Force  2500/Force  2500/Full   Off   
  GPON2/6    GPON      Up    Up   Force  2500/Force  2500/Full   Off   
  GPON2/7    GPON      Up    Up   Force  2500/Force  2500/Full   Off   
  GPON2/8    GPON      Up    Up   Force  2500/Force  2500/Full   Off   
  GPON2/9    GPON      Up    Up   Force  2500/Force  2500/Full   Off   
  GPON2/10   GPON      Up    Up   Force  2500/Force  2500/Full   Off   
  GPON2/11   GPON      Up    Up   Force  2500/Force  2500/Full   Off   
  GPON2/12   GPON      Up    Up   Force  2500/Force  2500/Full   Off   
  GPON2/13   GPON      Up    Up   Force  2500/Force  2500/Full   Off   
  GPON2/14   GPON      Up    Up   Force  2500/Force  2500/Full   Off   
  GPON2/15   GPON      Up    Up   Force  2500/Force  2500/Full   Off   
  GPON2/16   GPON      Up    Up   Force  2500/Force  2500/Full   Off   
---------------------------------------------------------------------------
  CG1        Trunk     Up   Down   NA      NA/NA        0/NA     NA    
  CG2        Trunk     Up   Down   NA      NA/NA        0/NA     NA    
  CG3        Trunk     Up   Down   NA      NA/NA        0/NA     NA    
*/

const displayUplinks = async (options) => {  
  const conn = await connect(options)
  const cmd = `show interface-status`  
  const chunk = await conn.exec(cmd)
  const splitted = chunk.split('\n')
  
  const columns = [
    [0, 13],
    [13, 22],
    [22, 28],
    [28, 34],
    [34, 41],
    [41, 53],
    [53, 64],
    [64, 74],
  ]

  const data = dummy2json(splitted.join('\n'), columns, 1)  

  return data
    .filter((element) => element.type.toLowerCase() === 'xe-fx')
    .map((element) => ({
      name: (element.interface || '').trim(),
      description: '',
      port_attribute: element.nego,
      mode: element['cur-speed'].trim().toLowerCase().split('/')[1].toLowerCase(),
      speed: element['cur-speed'].trim().toLowerCase().split('/')[0].replace('g', '000'),
      admin_status: element.admin,
      physical_status: element.oper,
      prot_status: element.oper,
      custom_fields: {
        ...element
      }
    }))
}

module.exports = displayUplinks