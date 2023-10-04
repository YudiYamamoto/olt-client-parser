const { connect } = require('../../../../config/ssh-connect')

// Portas de 1Gbps (giga-ethernet)
// speed-10M - Especifica a taxa da interface como sendo 10Mbps
// speed-100M - Especifica a taxa da interface como sendo 100Mbps

// Portas de 10Gbps (10giga-ethernet)
// speed-1000M - Especifica a taxa da interface como sendo 1000Mbps
// speed-2500M - Especifica a taxa da interface como sendo 2500Mbps
// speed-10000M - Especifica a taxa da interface como sendo 10000Mbps

// half-duplex - Define que a transmissão e a recepção de dados podem ocorrer alternadamente na interface.
// full-duplex - Define que a transmissão e a recepção de dados podem ocorrer simultaneamente na interface.

module.exports = async (options, { interface, speed="100M" }) => {
  return (await connect(options)).execParks([
    'conf t',
    `interface ${interface}`,
    `autonegotiation disabled speed-${speed} full-duplex`,
    'end',
  ]);
}
