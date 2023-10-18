const { connect } = require("../../../../../config/ssh-connect");
const { dummy2json, line2json } = require("../../../../../utils/lib");

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
const displayPon = async (options, { slot = "1", port = "1", ont_id = "1" }) => {
  const cmd = `show interface gpon 1/${slot}/${port} onu ${ont_id}`;
  const conn = await connect(options);
  const chunk = await conn.execDatacom(cmd);
  if (!chunk && chunk === "") return null;

  const splitted = chunk.split("\r\n");
  splitted.shift();
  splitted.pop();

  const statusRegex =
    /Physical interface\s+:\s+gpon\s+\d+\/\d+\/\d+,\s+([A-Za-z]+),/i;
  const match = statusRegex.exec(splitted[0]);
  const operationalStatus = match && match[1].toLowerCase() === "enabled";

  const item = column2json(
    splitted
      .map((item2) =>
        item2.replace(":", "[$%]").replace(/\:/gi, "-").replace("[$%]", ":")
      )
      .splice(1)
  );

  return {
    admin_status: false,
    operational_status: item['physicalinterface'].split(', ')[1],
  };
};

module.exports = displayPon;
