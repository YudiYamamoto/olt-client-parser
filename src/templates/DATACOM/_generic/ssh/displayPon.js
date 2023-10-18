const displayPons = require('./displayPons')

/*
Physical interface   :  gpon 1/1/1, Enabled, Physical link is Up
Link-level type      :  GPON
Logical reach        :  0-40 km
Downstream FEC       :  Enabled
Upstream FEC         :  Enabled
Transceiver type     :  sps-43-48h-hp-cde
Allocated upstream bandwidth
    Fixed + Assured  :  0          kbit/s
    Fixed            :  0          kbit/s
    Assured          :  0          kbit/s
    Max              :  768000     kbit/s
    Overhead         :  99         kbit/s (3 ONUs)
Available upstream bandwidth
    CBR   BW         :  615744     kbit/s
    Total BW         :  1216576    kbit/s
*/

//TODO Verificar
const displayPon = async (options, { port, ...params }) => {
  const data = await displayPons(options, params);

  return data.port || ''
}

module.exports = displayPon;
