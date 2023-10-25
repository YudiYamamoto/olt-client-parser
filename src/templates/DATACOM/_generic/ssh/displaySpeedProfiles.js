const { connect } = require('../../../../config/ssh-connect')
const { splitResponse } = require('../../../../utils/parks')

/*
OLT_Teste# show running-config profile gpon bandwidth-profile
profile gpon bandwidth-profile DBA_FIXO
 traffic type-1 fixed-bw 512
!
profile gpon bandwidth-profile DBA_UPLOAD_100M
 traffic type-4 max-bw 102400
!
profile gpon bandwidth-profile MAX_200M
 traffic type-4 max-bw 204800
!
profile gpon bandwidth-profile MAX_350M
 traffic type-4 max-bw 358400
!
OLT_Teste# 
*/

const displaySpeedProfiles = async (originalOptions) => {
  const conn = await connect(originalOptions)
  const cmd = 'show running-config profile gpon bandwidth-profile | nomore'
  const chunk = await conn.execDatacom(cmd)
 
  if (!chunk || chunk === '') return null

  const splitted = splitResponse(chunk);
  
  const profileGroup = [];
  let profile = [];

  for (const linha of splitted) {
    if (linha === '!') {
      if (profile.length > 0) {
        profileGroup.push(profile);
        profile = [];
      }
    } else {
      profile.push(linha);
    }
  }

  if (profile.length > 0) {
    profileGroup.push(profile);
  }

  return profileGroup.map((item) => {
    const name = item[0].split(' ')[3] ?? '';
    const type = item[1].split(' ')[2].replace('type-', '') ?? '';
    const speed = item[1].split(' ')[4] ?? '';

    return {
      name,
      type,
      direction: '',
      speed,
      pir: '',
      assured: '0',
      maximum: '0'
    }
  })
}

module.exports = displaySpeedProfiles
