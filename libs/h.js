window.h = window.h || {}
h.a = (function(document) {
  const path = 'components'
  const ext = '.html'
  const libs = ['']
  const head = document.getElementsByTagName('head')[0]
  let components = []

  function loadComponent(component) {
    const href = !!component ? [path, component + ext].join('/') : path
    let element = document.createElement('link')
    element.setAttribute('rel', 'import')
    element.setAttribute('href', href)
    return components.push(head.appendChild(element))
  }

  function loadComponents(components) {
    for (let i=0, l=components.length; i<l; i++) {
      loadComponent(components[i])
    }
  }

  loadComponents(libs)

  return {
    load: loadComponents,
    components: components
  }
})(document)
h.c = {
  api: {
    host: 'http://localhost:3001',
    version: 'v1',
    routes: {
      session: 'me'
    }
  },
  components: {},
  xhr: function (method, url) {
    let xhr = new XMLHttpRequest()
    if ('withCredentials' in xhr) {
      xhr.open(method, url, true)
    } else if (typeof XDomainRequest !== 'undefined') {
      xhr = new XDomainRequest()
      xhr.open(method, url)
    } else {
      xhr = null
    }
    if (!xhr) throw new Error('CORS not supported')
    return xhr
  },
  Component: class {
    constructor(name, element) {
      this.currentScript = document['currentScript' || '_currentScript']
      this.ownerDocument = this.currentScript.ownerDocument
      this.templates = this.ownerDocument.getElementsByTagName('template')
      this.tagName = `h-${name.toLowerCase()}`
      this.element = element
      h.c.components[name] = this
    }
    register() {
      return document.registerElement(this.tagName, this.element)
    }
  }
}

window.addEventListener('HTMLImportsLoaded', function(e) {
  console.log('Imports Loaded')
  for (let name in h.c.components) {
    h.c.components[name].register()
  }
})

window.addEventListener('WebComponentsReady', function(e) {
  console.log('Components are ready')
})
