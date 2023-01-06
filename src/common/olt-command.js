// const displayPermissionByUser = require('./displayPermissionByUser')

const OLT = require('./olt')

class OLTCommand extends OLT {
  async displayPermissionByUser(username) {
    return this.getContainer().displayPermissionByUser(this.getOptions(), username)
  }

  async displayBoard(board) {
    return this.getContainer().displayBoard(this.getOptions(), board)
  }
}

module.exports = OLTCommand