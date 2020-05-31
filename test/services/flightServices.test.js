beforeEach(() => {
  jest.resetModules()
})

const mockText = JSON.stringify(require('./mock/response.json'))

describe('Testing flight service', () => {
  describe('source1()', () => {
    it('should return flights list from comtravo api', async () => {
      jest.mock('superagent', () => ({
        get: jest.fn(() => {}).mockReturnThis(),
        query: jest.fn(() => {}).mockReturnThis(),
        set: jest.fn(async () => {
          return { status: 200, text: mockText }
        })
      }))
      const flightService = require('../../src/services/flightService')

      const result = await flightService.source1()
      expect(result.length).toBe(14)
    })
  })
})
