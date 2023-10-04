const generic = require('./_generic')
const MA5608T = require('./MA5608T')
const MA5603T = require('./MA5608T')

module.exports = {
  generic,
  MA5608T: {
    ...Object.assign(generic, MA5608T),
    options: {
      // shellPrompt: 'MA5608T>',
      params: {
        numberPort: 16
      }
    }
  },
  MA5603T: {
    ...Object.assign(generic, MA5603T),
    options: {
      // shellPrompt: 'MA5603T>',
      params: {
        numberPort: 16
      }
    }
  },
  options: {
    // shellPrompt: 'MA5608T>',
    loginPrompt: /name[: ]*$/i,
    passwordPrompt: /password[: ]*$/i,
    encoding: 'utf8',
    negotiationMandatory: false,
    failedLoginMatch: 'Username or password invalid',
    timeout: 2500,
    pageSeparator: '---- More',
    // pageSeparator: `---- More ( Press 'Q' to break ) ----\x1B[37D                                     \x1B[37D`,
    // pageSeparator: /---- More(.)*/i
    // debug: true,
    // waitFor: true,
    // newlineReplace: '\n'
    // stripShellPrompt: false,
    // escapeHandler: /x1B\[37/
  }
}