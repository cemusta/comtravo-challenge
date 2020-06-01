const { logger } = require('../middlewares/logger')
const dataService = require('./dataService')

const consolidateFlights = async () => {
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
    const requests = [
      dataService.getData('https://discovery-stub.comtravo.com/source1'),
      dataService.getData('https://discovery-stub.comtravo.com/source2', true)
    ]

    const results = await Promise.all(requests)

    return results
  } catch (err) {
    logger.error(`getFlights error: ${err.message}`)

    // throw other unhandled errors
    throw err
  }
}

module.exports = {
  consolidateFlights,
  getFlights
}
