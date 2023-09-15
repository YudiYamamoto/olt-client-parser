const { connect } = require('../../../../config/ssh-connect')
const { dummy2json } = require('../../../../utils/lib')

/*
-----------------------------------------------------------------------
  VLAN   Type      Attribute  STND-Port NUM   SERV-Port NUM  VLAN-Con NUM
  -----------------------------------------------------------------------
     1   smart     common                 4               0             -
   100   smart     common                 1               0             -
   101   smart     common                 0               0             -
   102   smart     common                 0               0             -
   103   smart     common                 0               0             -
   104   smart     common                 0               0             -
   105   smart     common                 0               0             -
   106   smart     common                 0               0             -
   107   smart     common                 0               0             -
   108   smart     common                 0               0             -
   109   smart     common                 0               0             -
   110   smart     common                 0               0             -
   111   smart     common                 0               0             -
   112   smart     common                 0               0             -
   113   smart     common                 0               0             -
   114   smart     common                 0               0             -
   115   smart     common                 0               0             -
  2573   standard  common                 0               0             -
  -----------------------------------------------------------------------
*/

const displayVlans = async (originalOptions) => {
  const conn = await connect(originalOptions)
  const cmd = `enable
	display vlan all`
  const chunk = await conn.exec7(cmd)
  if (!chunk && chunk === '') return null
  const splitted = chunk.split('\r\n')

 
  splitted.shift()
  splitted.shift()
  splitted.shift()
	splitted.shift()
	splitted.shift()
	splitted.shift()
	splitted.pop()
  splitted.pop()

  const columns = [
    [0, 8],
    [8, 19],
    [19, 30],
    [30, 46],
    [46, 61],
    [61, 74],
  ]

  const data = dummy2json(splitted.join('\n'), columns, 2)

  return data.map((item) => ({
    vlan: item.vlan, 
    type: item.type,
    attribute: item.attribute,
    STND_Port_NUM: item['s_t_n_d-_port_n_u_m'],
    SERV_Port_NUM: item['s_e_r_v-_port_n_u_m'],
    VLAN_Con_NUM: item['v_l_a_n-_con_n_u_m'],
  }))
}

module.exports = displayVlans