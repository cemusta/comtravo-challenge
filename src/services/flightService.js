const superagent = require('superagent')
const { logger } = require('../middlewares/logger')

const consolidate = async () => {
  try {
    const x = source1()
    const y = source2()

    const res = Promise.raceAll([x, y], 950, null)

    return res
  } catch (err) {
    logger.error(`consolidate error: ${err.message}`)

    // throw other unhandled errors
    throw err
  }
}

const source1 = async () => {
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

    logger.info('source1 returned')

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
      return null
    }

    // throw other unhandled errors
    throw err
  }
}

const source2 = async () => {
  try {
    const request = superagent.get('https://discovery-stub.comtravo.com/source2')
      .set('user-agent', 'comtravo-comsumer')

    if (process.env.API_USER && process.env.API_PASS) {
      request.auth(process.env.API_USER, process.env.API_PASS)
    }

    const res = await request

    if (res.status !== 200) {
      logger.info('handle status', res)
      throw new Error('handle status')
    }

    const { text } = res

    const { flights } = JSON.parse(text)

    logger.info('source2 returned')

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
      return null
    }

    // throw other unhandled errors
    throw err
  }
}

Promise.raceAll = function (promises, timeoutTime, timeoutVal) {
  return Promise.all(promises.map(p => {
    return Promise.race([p, new Promise(resolve => setTimeout(() => resolve(timeoutVal), timeoutTime))])
  }))
}

module.exports = {
  consolidate,
  source1
}
