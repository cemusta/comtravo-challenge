require('dotenv').config()

const serverPort = process.env.PORT
  ? process.env.PORT
  : 8080

const serverHost = process.env.PORT
  ? process.env.SWAGGER_HOST
  : 'localhost:8080'

const timeout = process.env.API_TIMEOUT
  ? process.env.API_TIMEOUT
  : 980

const config = {
  server_scheme: process.env.SWAGGER_SCHEME || 'http',
  server_port: serverPort,
  server_host: serverHost,
  timeout
}

module.exports = config
