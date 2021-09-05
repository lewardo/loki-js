const path = require('path')

module.exports = {
  route: app => {
    app.get(['/', '/about', '/contact'], (req, res) => {
      res.sendFile(
        path.resolve(__dirname, '../../', 'client/index.html')
      )
    })
  }
}