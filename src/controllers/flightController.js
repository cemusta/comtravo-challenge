// const logger = require('../middlewares/logger').logger
const flightService = require('../services/flightService')

// get: /api/flights/
exports.get = async (req, res, next) => {
  try {
    const flights = await flightService.consolidate()

    return res.status(200).json({ flights })
  } catch (error) {
    next(error)
  }
}
