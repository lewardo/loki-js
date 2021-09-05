/* 
 * load resources and then start page code
 */

window.asyncLoadResources([ 
  "https://unpkg.com/alpinejs@3.2.4/dist/cdn.min.js",
  "https://unpkg.com/domtastic@0.15.12/dist/domtastic.min.js",
  "https://unpkg.com/animejs@3.2.1/lib/anime.min.js" // js
], [
  "https://fonts.googleapis.com/css?family=Roboto+Mono&display=block"// css
]).then(() => {
  const mapsURL = "https://www.google.com/maps/place/St+James's+Park/@51.5028535,-0.1357721,16.52z/data=!4m13!1m7!3m6!1s0x47d8a00baf21de75:0x52963a5addd52a99!2sLondres!3b1!8m2!3d51.5073509!4d-0.1277583!3m4!1s0x487604dac0b1e01b:0xff55707680ba1d5f!8m2!3d51.5024597!4d-0.1348109"
  const initAnimation = {
    opacity: [0, 1],
    translateX: ['-25%', '0']
  }

  $(document).ready(function () {
    window.animePlugin( $ )

    $('[mask]').removeAttr('mask')  // now that Alpine has been loaded those which must be masked (by x-show) can be released to Alpine

    $('#overlay').animate({ width: 0 }, 1000)
    $('[init]').delay(250).animate(initAnimation, 1000) // animate all the introductory elements

    $('[initw]').delay(250).animateChildren(initAnimation, 1000)
    $('#aesthetics').delay(150).animateChildren({ height: ['0', '100%'] }, 1000) // animate all children of wappers to introductory elements


  })  
})
