const generic = require('./generic')
const MA5608T = require('./MA5608T')

module.exports = {
  generic,
  MA5608T: {
    ...generic,
    ...MA5608T,
    options: {
      shellPrompt: 'MA5608T>',
    }
  },
  // FAKE
  MA5608B: {
    ...generic,
    options: {
      shellPrompt: 'MA5608T>',
    }
  },
  options: {
    shellPrompt: '>',
    loginPrompt: /name[: ]*$/i,
    passwordPrompt: /password[: ]*$/i,
    encoding: 'utf8',
    negotiationMandatory: false,
    failedLoginMatch: 'Username or password invalid',
    timeout: 2500,
    // debug: true,
    // waitFor: false,
  }
}