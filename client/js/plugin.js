
/*
 *  plugin anime.js for jQuery-like DOM selection libraries (eg DOMtastic, psQuery, jQuery etc.)
 *  define function rather than calling outright to allow lazy loading of library
 */ 

window.animePlugin = function (DOMSelector) {
  DOMSelector.fn.animate = function (params, duration, callback, easing = "easeOutQuart") {
    this.forEach(function (el) {
      const delay = this.animationDelay || 0
      this.animationDelay = undefined

      if (params && duration) {
        anime({
          ...params,
          targets: el,
          duration: duration,
          delay: delay,
          easing: easing,
          complete: callback
        })

        return this
      }

      throw 'argument error'
    })
  }

  DOMSelector.fn.animateChildren = function (params, duration, callback, stagger, easing = "easeOutQuart") {
    this.forEach(function (el) {
      const delay = this.animationDelay || 0
      this.animationDelay = undefined

      if (!el.children) throw 'no offspring'

      const staggerDelay = stagger || 500 / el.children.length

      if (params && duration) {
        anime({
          ...params,
          targets: el.children,
          duration: duration,
          delay: delay == 0 ? anime.stagger(staggerDelay) : anime.stagger(staggerDelay, { start: delay }),
          easing: easing,
          complete: callback
        })

        return this
      }

      throw 'argument error'
    }) 
  }

  DOMSelector.fn.delay = function (delay) {
    this.animationDelay = delay

    return this
  }
}