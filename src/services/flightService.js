const config = require('../config')
const { logger } = require('../middlewares/logger')
const dataService = require('./dataService')

const consolidate = async () => {
  try {
    const res = await getFlights()

    // do the consolidation here

    return res
  } catch (err) {
    logger.error(`consolidate error: ${err.message}`)

    // throw other unhandled errors
    throw err
  }
}

const getFlights = async () => {
  try {
    const first = dataService.getData('https://discovery-stub.comtravo.com/source1')
    const second = dataService.getData('https://discovery-stub.comtravo.com/source2', true)

    const results = Promise.raceAll([first, second], config.timeout)

    return results
  } catch (err) {
    logger.error(`getFlights error: ${err.message}`)

    // throw other unhandled errors
    throw err
  }
}

Promise.raceAll = function (promises, timeoutTime) {
  return Promise.all(promises.map(p => {
    const value = Promise.race([p, new Promise(resolve => setTimeout(() => resolve(null), timeoutTime))])
    if (!value) {
      logger.warn(`${p} timeout`)
    }
    return value
  }))
}

module.exports = {
  consolidate,
  getFlights
}
