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
    const { 
      brand: brandOriginal, 
      model: modelOriginal, 
      firmware: firmwareOriginal,
      connectionType: connectionTypeOriginal,
    } = this.getParams()

    const brand = brandOriginal.toString().toUpperCase()
    const model = modelOriginal.toString().toUpperCase()
    const connectionType = connectionTypeOriginal.toString().toLowerCase()
    const firmware = `F${firmwareOriginal.toString().replace(/\./gi, '_')}`.toUpperCase()
    
    const brandTemplate = templates[brand]
    const modelTemplate = brandTemplate[model] || brandTemplate.generic
    const container = {
      ...(modelTemplate && modelTemplate[connectionType]),
      ...(modelTemplate && modelTemplate[firmware] && modelTemplate[firmware][connectionType])
    }

    const data = {
      container: {
        ...Object.assign(brandTemplate.generic, container),
      },
      options: {
        ...brandTemplate.options,
        ...modelTemplate.options,
        ...container.options,
      }
    }
    
    return data
  }
}

module.exports = OLT