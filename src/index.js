
const config = require('./config')
const logger = require('./middlewares/logger').logger

let server = null

async function startServer () {
  try {
    const app = require('./app')

    server = app.listen(config.server_port)

    const port = server.address().port

    logger.info(`App started listening at port: ${port}`)
  } catch (ex) {
    logger.error('express init failed: ', ex)
  }
}

startServer()

exports.stopServer = async () => {
  await server.close()
}
