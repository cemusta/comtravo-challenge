const superagent = require('superagent')
const { logger } = require('../middlewares/logger')

const consolidate = async () => {
  try {
    const request = superagent.get('https://discovery-stub.comtravo.com/source1')
      .set('user-agent', 'comtravo-comsumer')

    const res = await request

    if (res.status !== 200) {
      logger.info('handle status', res)
      throw new Error('handle status')
    }

    const { text } = res

    const { flights } = JSON.parse(text)

    return flights
  } catch (err) {
    if (err.status === 403) {
      logger.error('rate limit reached.')
      return null
    }

    if (err.status === 401) {
      logger.error('auth failed.')
      return null
    }

    if (err.status >= 500) {
      logger.error('server error.')
      throw err
    }

    // throw other unhandled errors
    throw err
  }
}

module.exports = {
  consolidate
}
