const express = require('express')
const router = express.Router()

const controller = require('../controllers/flightController')

/**
 * @swagger
 * /api/flights/:
 *   get:
 *     tags:
 *       - flights
 *     description: endpoint for listing consolidated flights records ( should return within 1 seconds )
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: list all repositories
 *       403:
 *         description: illegal query parameters
 *       500:
 *         description: internal server error
 */
router.get('/', controller.get)

module.exports = router
