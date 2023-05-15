
const displaySpeedProfiles = async (_originalOptions) => {
  const chunk = `177.128.98.246: terminal length 512
IRARA-OLT#show running-config | traffic-profile
traffic-profile MADE4OLT-VOIPMNG-10M cir 1024 cbs 102 pir 10240 pbs 1024 color-mode blind policer-type enhanced_mef coupling-flag enable
traffic-profile MADE4OLT-IPTV-50M-DOWN cir 56320 cbs 1023 pir 56320 pbs 1023 color-mode blind policer-type enhanced_mef coupling-flag enable
traffic-profile MADE4OLT-2G-DOWN cir 2048000 cbs 1023 pir 2048000 pbs 1023 color-mode blind policer-type enhanced_mef coupling-flag enable
traffic-profile MADE4OLT-1G-NOVO-DOWN cir 1024000 cbs 1023 pir 1024000 pbs 1023 color-mode blind policer-type enhanced_mef coupling-flag enable
traffic-profile MADE4OLT-1G-DOWN cir 1024000 cbs 1023 pir 1024000 pbs 1023 color-mode blind policer-type enhanced_mef coupling-flag enable`
  
  const splitted = chunk.split('\n')
  splitted.pop()
  splitted.shift()
  splitted.shift()

  return splitted.map(item => {
    const line = item.trim()
    if (!line) return
    const [_1, name, speed] = line.match(/traffic-profile (.*) cir (\d*)/) || []
    // const [_2, cbs] = line.match(/cbs (\d*)/) || []
    const [_3, pir] = line.match(/pir (\d*) /) || []
    // const [_4, pbs] = line.match(/pbs (\d*)/) || []
    const matchName = name.toLowerCase()  
    
    return {
      name,
      type: /voip/gi.test(matchName) ? 'voip' : /iptv/gi.test(matchName) ? 'iptv' : 'internet',
      direction: /up/gi.test(matchName) ? 'upload' : 'download',
      speed,
      pir,
      assured: '0',
      maximum: '0'
    }
  })
}

module.exports = displaySpeedProfiles