const { connect } = require('../../../../config/ssh-connect')
const { dummy2json } = require('../../../../utils/lib')

/*
177.128.199.14: show interface link | nomore
Gigabit Ethernet Interfaces:
CHASSIS                                                                         
ID/SLOT                                                                         
ID/PORT                                 Disabled  Blocked  Parent               
ID       Link  Shutdown  Speed  Duplex  by        by       LAG     Description  
--------------------------------------------------------------------------------
1/1/1    Down  false     -      -       -         -        -                    
1/1/2    Down  false     -      -       -         -        -                    
1/1/3    Down  false     -      -       -         -        -                    
1/1/4    Down  false     -      -       -         -        -                    

Ten Gigabit Ethernet Interfaces:
CHASSIS                                                                            
ID/SLOT                                                                            
ID/PORT                                 Disabled  Blocked  Parent                  
ID       Link  Shutdown  Speed  Duplex  by        by       LAG     Description     
-----------------------------------------------------------------------------------
1/1/1    Down  false     -      -       -         -        -       UPLINK-EXEMPLO  
1/1/2    Down  false     -      -       -         -        -                       
1/1/3    Down  false     -      -       -         -        -                       
1/1/4    Down  false     -      -       -         -        -                       

OLT_Teste#
*/

const displayUplinks = async (options) => {
  const conn = await connect(options)
  const cmd = `show interface link | nomore`
  const chunk = await conn.execDatacom(cmd)
  if (!chunk && chunk === '') return null
  
  const splitted = chunk.split('\r\n')
  splitted.shift()
  splitted.pop()

  const [error, joined] = splitted
    .join('||')
    .split('Ten Gigabit Ethernet Interfaces:')
    .map(item => {
      const newItem = item.split('||')
      newItem.shift()
      newItem.pop()

      return newItem
    })

  console.log(joined)
  joined.shift()
  joined.shift()

  const columns = [
    [0, 9],
    [9, 15],
    [15, 25],
    [25, 32],
    [32, 40],
    [40, 50],
    [50, 59],
    [59, 67],
    [67, 100]
  ]
  const elements = dummy2json(joined.join('\n'), columns, 2)

  return elements
    .map(element => ({
      name: element.idport_id,
      description: element.description,
      port_attribute: '',
      mode: element.duplex === '-' ? 'auto' : element.duplex,
      speed: element.speed,
      admin_status: element.shutdown.toLowerCase() === 'false' ? 'down': 'up',
      physical_status: element.link.toLowerCase(),
      prot_status: element.link.toLowerCase(),
      custom_fields: {
        ...element,
      }
    })
  )
}

module.exports = displayUplinks