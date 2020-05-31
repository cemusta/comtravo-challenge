const cors = require('cors')
const express = require('express')
var responseTime = require('response-time')
// setup general middlewares here

const configureMiddlewares = function (app) {
  app.disable('x-powered-by')

  app.use(responseTime())

  app.use(cors())

  app.use(express.json({ type: 'application/json' }))
}

const configureErrorHandler = (app) => {
  function errorHandler (err, req, res, next) {
    return res.status(500).json({
      status: 'error',
      message: err.message
    })
  }
  app.use(errorHandler)
}

module.exports = { configureMiddlewares, configureErrorHandler }
