const request = require('supertest')
beforeEach(() => {
  jest.resetModules()
})

it('should return flights array', async function (done) {
  jest.mock('../../src/services/flightService', () => ({
    consolidateFlights: jest.fn(async () => {
      return []
    })
  }))
  const app = require('../../src/app')
  const res = await request(app)
    .get('/api/flights')

  expect(res).toHaveProperty('status', 200)
  expect(res).toHaveProperty('text', '{"flights":[]}')
  done()
})

it('should return 500 on error', async function (done) {
  jest.mock('../../src/services/flightService', () => ({
    consolidateFlights: jest.fn(async () => {
      throw new Error('Mock error')
    })
  }))
  const app = require('../../src/app')
  const res = await request(app)
    .get('/api/flights')

  expect(res).toHaveProperty('status', 500)
  expect(res).toHaveProperty('text', '{"status":"error","message":"Mock error"}')
  done()
})
