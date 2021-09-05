/* 
 *  extensions to the window object
 */

/* 
 *  ajax-like interface to load scripts and styles after page load, a bit hacky but it works
 */

window.asyncLoadResources = async function (scripts, styles) {
  // adds DOMNode (script or link) to head and returns a promise that resolves onload
  const loadURL = async (url, type) => {
    let params = undefined
    
    window.Element.prototype.setAttributes = function (attrs) {
      for (const attr in attrs) {
        this[attr] = attrs[attr]
      }
    }

    if (type == 'script') params = { src: url, async: true }
    if (type == 'link') params = { href: url, type: 'text/css', rel: 'stylesheet' }

    return new Promise((resolve, reject) => {
      let el = document.createElement(type)

      el.setAttributes({
        ...params,
        onload: resolve,
        onerror: reject
      })

      document.head.appendChild(el)
    })
  }

  // dispatch all the scripts.styles with respective promises
  scripts = scripts.map(async script => await loadURL(script, 'script'))
  styles = styles.map(async style => await loadURL(style, 'link'))

  // await all the promises to resolve, awaiting all the awaits
  return await Promise.all(scripts, styles)
}

/*
 *  object to facilitate the form-related 
 */

window.form = {
  /* function to return object to x-data of form */
  init () {
    return {
      name: '',
      surname: '',
      email: '',              // variables bound to input fields 
      /* function from inside Alpine form scope to this object with other function */
      update: function () { 
        [ name, surname, email ] = form.info.getInfo()
      }
    }
  },
  /* function to do the ajaxy stuff to submit form info to the server */
  submit (name, surname, email) {
    console.table([name, surname, email])

    localStorage.clear()  // so that it doesn't reappear after submit
  },
  info: {
    name: localStorage.getItem('name') || '',
    surname:  localStorage.getItem('surname') || '',
    email:  localStorage.getItem('email') || '',
    getInfo () {
      return [ this.name, this.surname, this.email ]
    },
    saveInfo (n, s, e) {
      localStorage.setItem('name', n); this.name = n
      localStorage.setItem('surname', s); this.surname = s
      localStorage.setItem('email', e); this.email = e
    }
  }
}
