beforeEach(() => {
  jest.resetModules()
})

const mockfirst = JSON.stringify(require('./mock/first.json'))
const mocksecond = JSON.stringify(require('./mock/second.json'))

describe('getFlights()', () => {
  it('should return array of results', async () => {
    jest.mock('../../src/services/dataService', () => ({
      getData: jest.fn()
        .mockReturnValueOnce(Promise.resolve(mockfirst))
        .mockReturnValueOnce(Promise.resolve(mocksecond))
    }))
    const flightService = require('../../src/services/flightService')

    const result = await flightService.getFlights()
    expect(result.length).toBe(2)
    expect(result[0]).toBe(mockfirst)
    expect(result[1]).toBe(mocksecond)
  })

  it('should return null if results are timeouted', async () => {
    jest.mock('../../src/services/dataService', () => ({
      getData: jest.fn(async () => {
        return new Promise(resolve => setTimeout(() => resolve(null), 0))
      })
    }))
    const flightService = require('../../src/services/flightService')

    const result = await flightService.getFlights()
    expect(result.length).toBe(2)
    expect(result).toStrictEqual([null, null])
  })
})

describe('consolidateFlights()', () => {
  it('should consolidate results', async () => {
    jest.mock('../../src/services/dataService', () => ({
      getData: jest.fn()
        .mockReturnValueOnce(Promise.resolve([1, 2, 3]))
        .mockReturnValueOnce(Promise.resolve([3, 4, 5]))
    }))
    const flightService = require('../../src/services/flightService')

    const result = await flightService.consolidateFlights()
    expect(result.length).toBe(5)
    expect(result).toStrictEqual([1, 2, 3, 4, 5])
  })

  it('should consolidate results with one timeout or error', async () => {
    jest.mock('../../src/services/dataService', () => ({
      getData: jest.fn()
        .mockReturnValueOnce(Promise.resolve(null))
        .mockReturnValueOnce(Promise.resolve([3, 4, 5]))
    }))
    const flightService = require('../../src/services/flightService')

    const result = await flightService.consolidateFlights()
    expect(result.length).toBe(3)
    expect(result).toStrictEqual([3, 4, 5])
  })

  it('should consolidate results with all services returning null', async () => {
    jest.mock('../../src/services/dataService', () => ({
      getData: jest.fn()
        .mockReturnValueOnce(Promise.resolve(null))
        .mockReturnValueOnce(Promise.resolve(null))
    }))
    const flightService = require('../../src/services/flightService')

    const result = await flightService.consolidateFlights()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })
})
