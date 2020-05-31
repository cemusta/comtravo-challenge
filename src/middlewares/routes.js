const configureRoutes = function (app) {
  app.use('/api/flights', require('../routers/flightRouter'))
}

module.exports = { configureRoutes }
