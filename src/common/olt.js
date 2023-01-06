const templates = require('../templates')

class OLT {
  constructor({ options, ...params }) {
    this._params = params
    const { options: defaultOptions, container } = this.requireTemplate()
    this._container = container
    this._options = { 
      ...defaultOptions, 
      ...options 
    }
  }

  getOptions() {
    return this._options
  }

  getParams() {
    return this._params
  }

  getContainer() {
    return this._container
  }

  requireTemplate() {
    const { brand: brandOriginal, model: modelOriginal, firmware: firmwareOriginal } = this.getParams()

    const brand = brandOriginal.toString().toUpperCase()
    const model = modelOriginal.toString().toUpperCase()
    const firmware = `F${firmwareOriginal.toString().replace(/\./gi, '_')}`.toUpperCase()

    const brandTemplate = templates[brand]
    const modelTemplate = brandTemplate[model] || brandTemplate.generic
    const container = modelTemplate[firmware] || modelTemplate

    return {
      container,
      options: {
        ...brandTemplate.options,
        ...modelTemplate.options,
        ...container.options,
      }
    }
  }
}

module.exports = OLT