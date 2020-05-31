describe('testing entry point', function () {
  const server = require('../src/index')

  it('should startup and shutdown without problem', async function () {
    await server.stopServer()
  })
})
