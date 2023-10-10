const { str2mac } = require('../../../../../utils/lib')

const generateCommmand = (_type, f_p_s, ont_id) => `show mac interface vport-${f_p_s}.${ont_id}:1`

const runCommand = (chunkMA) => {
  let mac_address = ''
  if (chunkMA && chunkMA !== '') {
    const [_line1, _line2, _line3, _line4, _line5, ...splitted] = chunkMA.split('\r\n')
    mac_address = (splitted && (splitted[3] || '').substring(0, 17).trim()) || ''
  }
  
  return { 
    mac_address: str2mac((mac_address || '')
      .replace(/\./gi, ''))
      .replace(/\-/gi, ':')
      .replace('[object Object]', '')
  }
}

module.exports = {
  generateCommmand,
  runCommand,
}