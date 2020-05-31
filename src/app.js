const express = require('express')
const { configureRequestLogger, configureErrorLogger, logger } = require('./middlewares/logger')
const { configureMiddlewares } = require('./middlewares/general')
const { configureRoutes } = require('./middlewares/routes')
const { configureSwagger } = require('./middlewares/swagger')

const app = express()

configureRequestLogger(app)
configureMiddlewares(app)
configureRoutes(app)
configureSwagger(app)
configureErrorLogger(app)

logger.info('default API initialized.')

// export the app for testing
module.exports = app
