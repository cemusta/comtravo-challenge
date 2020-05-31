const cors = require('cors')
const express = require('express')
// setup general middlewares here

const configureMiddlewares = function (app) {
  app.disable('x-powered-by')
  app.use(cors())

  app.use(express.json({ type: 'application/json' }))
}

module.exports = { configureMiddlewares }
