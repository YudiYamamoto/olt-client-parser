const { connect } = require('../../../../config/ssh-connect')

	const deleteVlan = async (options, vlan) => {
		const conn = await connect(options)
		const cmd = `config
    no dot1q vlan ${vlan}
    top
    commit
    exit
    `
	await conn.execDatacom(cmd)

	return cmd
}

module.exports = deleteVlan
