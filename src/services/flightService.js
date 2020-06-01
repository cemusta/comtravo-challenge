const { logger } = require('../middlewares/logger')
const dataService = require('./dataService')

const consolidate = async () => {
  try {
    const results = await getFlights()

    const flightStrings = []
    const flights = []
    let duplicateCount = 0

    for (const result of results) {
      if (!result) { continue }

      for (const flight of result) {
        const str = JSON.stringify(flight)
        if (flightStrings.includes(str)) {
          duplicateCount++
        } else {
          flightStrings.push(str)
          flights.push(flight)
        }
      }
    }

    if (duplicateCount > 0) {
      logger.warn(`removed ${duplicateCount} duplicate`)
    }

    return flights
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

    // const results = Promise.raceAll([first, second], config.timeout)
    const results = await Promise.all([first, second])

    return results
  } catch (err) {
    logger.error(`getFlights error: ${err.message}`)

    // throw other unhandled errors
    throw err
  }
}

module.exports = {
  consolidate,
  getFlights
}
