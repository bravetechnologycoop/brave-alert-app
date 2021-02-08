// In-house dependencies
import ButtonsApiService from '../../src/services/ButtonsApiService'
import * as FetchService from '../../src/services/FetchService'

// Setup mocks for this whole test file
jest.mock('../../src/services/FetchService', () => ({
  post: jest.fn(),
}))
jest.mock('../../src/services/CredentialsService', () => ({
  getApiKey: jest.fn().mockReturnValue('API_KEY'),
}))

describe('ButtonsApiService', () => {
  describe('testRequest', () => {
    it('calls POST with the correct URI, base URL, and headers', () => {
      const expectedParameters = {
        uri: '/alert/test',
        base: 'https://buttons.com',
        headers: {
          'X-API-KEY': 'API_KEY',
        },
      }

      ButtonsApiService.testRequest()

      expect(FetchService.post).toHaveBeenCalledWith(expectedParameters)
    })
  })

  describe('fakeEndpointRequest', () => {
    it('calls POST with the correct URI, base URL, and headers', () => {
      const expectedParameters = {
        uri: 'not/in/real/life',
        base: 'https://buttons.com',
        headers: {
          'X-API-KEY': 'API_KEY',
        },
      }

      ButtonsApiService.fakeEndpointRequest()

      expect(FetchService.post).toHaveBeenCalledWith(expectedParameters)
    })
  })
})
