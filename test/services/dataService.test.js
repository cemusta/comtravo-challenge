beforeEach(() => {
  jest.resetModules()
  process.env.API_TIMEOUT = 20
})

const mockText = JSON.stringify(require('./mock/response.json'))

describe('Testing data service', () => {
  describe('getData()', () => {
    it('should return flights list from comtravo api', async () => {
      jest.mock('superagent', () => ({
        get: jest.fn(() => {}).mockReturnThis(),
        set: jest.fn(async () => {
          // return { status: 200, text: mockText }
          return new Promise(resolve => setTimeout(() => resolve({ status: 200, text: mockText }), 0))
        })
      }))
      const dataService = require('../../src/services/dataService')

      const result = await dataService.getData('some url')
      expect(result.length).toBe(14)
    })

    it('should return null on 401', async () => {
      jest.mock('superagent', () => ({
        get: jest.fn(() => {}).mockReturnThis(),
        set: jest.fn(async () => {
          const err = new Error('test')
          err.status = 401
          return new Promise((resolve, reject) => setTimeout(() => reject(err), 0))
        })
      }))
      const dataService = require('../../src/services/dataService')

      const result = await dataService.getData('some url')
      expect(result).toBe(null)
    })

    it('should return null on 403', async () => {
      jest.mock('superagent', () => ({
        get: jest.fn(() => {}).mockReturnThis(),
        set: jest.fn(async () => {
          const err = new Error('test')
          err.status = 403
          return new Promise((resolve, reject) => setTimeout(() => reject(err), 0))
        })
      }))
      const dataService = require('../../src/services/dataService')

      const result = await dataService.getData('some url')
      expect(result).toBe(null)
    })

    it('should return null on 404', async () => {
      jest.mock('superagent', () => ({
        get: jest.fn(() => {}).mockReturnThis(),
        set: jest.fn(async () => {
          const err = new Error('test')
          err.status = 404
          return new Promise((resolve, reject) => setTimeout(() => reject(err), 0))
        })
      }))
      const dataService = require('../../src/services/dataService')

      const result = await dataService.getData('some url')
      expect(result).toBe(null)
    })

    it('should return null on 500', async () => {
      jest.mock('superagent', () => ({
        get: jest.fn(() => {}).mockReturnThis(),
        set: jest.fn(async () => {
          const err = new Error('test')
          err.status = 500
          return new Promise((resolve, reject) => setTimeout(() => reject(err), 0))
        })
      }))
      const dataService = require('../../src/services/dataService')

      const result = await dataService.getData('some url')
      expect(result).toBe(null)
    })

    it('should throw error on generic error', async () => {
      jest.mock('superagent', () => ({
        get: jest.fn(() => {}).mockReturnThis(),
        set: jest.fn(async () => {
          return new Promise((resolve, reject) => setTimeout(() => reject(new Error('generic error')), 0))
        })
      }))
      const dataService = require('../../src/services/dataService')

      await expect(dataService.getData('some url'))
        .rejects
        .toThrow('generic error')
    })
  })
})
