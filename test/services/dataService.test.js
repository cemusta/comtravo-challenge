beforeEach(() => {
  jest.resetModules()
})

const mockText = JSON.stringify(require('./mock/response.json'))

describe('Testing data service', () => {
  describe('getData()', () => {
    it('should return flights list from comtravo api', async () => {
      jest.mock('superagent', () => ({
        get: jest.fn(() => {}).mockReturnThis(),
        query: jest.fn(() => {}).mockReturnThis(),
        set: jest.fn(async () => {
          return { status: 200, text: mockText }
        })
      }))
      const dataService = require('../../src/services/dataService')

      const result = await dataService.getData('some url')
      expect(result.length).toBe(14)
    })

    it('should return null on 401', async () => {
      jest.mock('superagent', () => ({
        get: jest.fn(() => {}).mockReturnThis(),
        query: jest.fn(() => {}).mockReturnThis(),
        set: jest.fn(async () => {
          const err = new Error('test')
          err.status = 401
          throw err
        })
      }))
      const dataService = require('../../src/services/dataService')

      const result = await dataService.getData('some url')
      expect(result).toBe(null)
    })

    it('should return null on 403', async () => {
      jest.mock('superagent', () => ({
        get: jest.fn(() => {}).mockReturnThis(),
        query: jest.fn(() => {}).mockReturnThis(),
        set: jest.fn(async () => {
          const err = new Error('test')
          err.status = 403
          throw err
        })
      }))
      const dataService = require('../../src/services/dataService')

      const result = await dataService.getData('some url')
      expect(result).toBe(null)
    })

    it('should return null on 404', async () => {
      jest.mock('superagent', () => ({
        get: jest.fn(() => {}).mockReturnThis(),
        query: jest.fn(() => {}).mockReturnThis(),
        set: jest.fn(async () => {
          const err = new Error('test')
          err.status = 404
          throw err
        })
      }))
      const dataService = require('../../src/services/dataService')

      const result = await dataService.getData('some url')
      expect(result).toBe(null)
    })

    it('should return null on 500', async () => {
      jest.mock('superagent', () => ({
        get: jest.fn(() => {}).mockReturnThis(),
        query: jest.fn(() => {}).mockReturnThis(),
        set: jest.fn(async () => {
          const err = new Error('test')
          err.status = 500
          throw err
        })
      }))
      const dataService = require('../../src/services/dataService')

      const result = await dataService.getData('some url')
      expect(result).toBe(null)
    })

    it('should throw error on generic error', async () => {
      jest.mock('superagent', () => ({
        get: jest.fn(() => {}).mockReturnThis(),
        query: jest.fn(() => {}).mockReturnThis(),
        set: jest.fn(async () => {
          throw new Error('generic error')
        })
      }))
      const dataService = require('../../src/services/dataService')

      await expect(dataService.getData('some url'))
        .rejects
        .toThrow('generic error')
    })
  })
})
