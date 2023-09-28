const OLT = require('./olt')
process.on('unhandledRejection', error => {
  console.error(error.message)
})

class OLTCommand extends OLT {
  constructor (props) {
    super(props)
    const container = this.getContainer()
    const options = this.getOptions()
    const keys = Object.keys(container)
    const instance = keys.map((cmd) => ([cmd, (params) => container[cmd](options, params) ]))
    const entries = new Map(instance)
    return Object.fromEntries(entries)
  }
}

module.exports = OLTCommand