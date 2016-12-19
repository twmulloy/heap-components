window.Heap = window.Heap || {}
Heap.a = (function(document) {
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
