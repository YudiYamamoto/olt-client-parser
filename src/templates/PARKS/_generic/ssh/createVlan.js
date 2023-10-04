const { connect } = require('../../../../config/ssh-connect')

// Isolated é feito para isolar o tráfego entre as PONs,
// evitando de "vazar" o tráfego de um cliente para outro de outra PON.

// O tráfego vindo das portas GPON somente irão comunicar com a(s) interface(s)
// de uplink que foi adicionada com o comando de uplink isolated.

// É OBRIGATORIO TER O "uplink isolate" na interface de uplink para funcionar.

module.exports = async (options, { vlan }) => {
  return (await connect(options)).execParks([
    'conf t',
    'vlan database',
    `vlan ${vlan} isolated`,
    'end',
  ]);
}
