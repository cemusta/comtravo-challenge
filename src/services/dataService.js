const superagent = require('superagent')
const { logger } = require('../middlewares/logger')

const getData = async (url, auth = false) => {
  try {
    const request = superagent.get(url)
      .set('user-agent', 'comtravo-comsumer')

    if (auth && process.env.API_USER && process.env.API_PASS) {
      request.auth(process.env.API_USER, process.env.API_PASS)
    }

    const res = await request

    if (res.status !== 200) {
      logger.info('handle status', res)
      throw new Error('handle status')
    }

    const { text } = res

    const { flights } = JSON.parse(text)

    logger.info(`${url} finished.`)

    return flights
  } catch (err) {
    if (err.status === 401) {
      logger.error('auth failed.')
      return null
    }

    if (err.status === 403) {
      logger.error('rate limit reached.')
      return null
    }

    if (err.status === 404) {
      logger.error('data source not found.')
      return null
    }

    if (err.status >= 500) {
      logger.error('server error.')
      return null
    }

    // throw other unhandled errors
    throw err
  }
}

module.exports = {
  getData
}
