const { connect } = require('../../../../config/ssh-connect')

// TODO: verificar modificacao na assinatura da funcao entre huawei e zte
const vlanTag = async (options, { interface, board, slot, port, vlan }) => {
  const conn = await connect(options)
  const cmd = `config
    dot1q vlan ${vlan} interface ${interface}-${board}/${slot}/${port} tagged 
		commit
    top
    exit
		`
  const a = await conn.execDatacom(cmd)

	return cmd
}

module.exports = vlanTag
