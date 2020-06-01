const config = require('../config')
const superagent = require('superagent')
const { logger } = require('../middlewares/logger')

const getData = async (url, auth = false) => {
  try {
    const request = superagent.get(url)
      .set('user-agent', 'comtravo-comsumer')

    if (auth && process.env.API_USER && process.env.API_PASS) {
      request.auth(process.env.API_USER, process.env.API_PASS)
    }

    const res = await Promise.race([request, new Promise(resolve => setTimeout(() => resolve(null), config.timeout))])

    if (!res) {
      logger.warn(`${url} timeouted (limit: ${config.timeout}ms).`)
      return null
    }

    if (res.status !== 200) {
      logger.info('handle status', res)
      throw new Error('handle status')
    }

    const { text } = res

    const { flights } = JSON.parse(text)

    logger.info(`${url} returned (${flights.length}) items.`)

    return flights
  } catch (err) {
    if (err.status === 401) {
      logger.error(`${url} returned auth fail (401).`)
      return null
    }

    if (err.status === 403) {
      logger.error(`${url} returned rate limit error (403).`)
      return null
    }

    if (err.status === 404) {
      logger.error(`${url} returned not found (404).`)
      return null
    }

    if (err.status >= 500) {
      logger.error(`${url} returned server error (500).`)
      return null
    }

    logger.error(`${url} returned generic error, rethrowing.`)
    // throw other unhandled errors
    throw err
  }
}

module.exports = {
  getData
}
