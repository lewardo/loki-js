const express = require('express')

const path = require('path')

const config = require('./config')
const router = require('./routes')

const app = express()

router.route(app)

app.use(express.static(path.join(__dirname, '../../', 'client')))
  .listen(config.port, console.log(`listening on port ${ config.port }`))
