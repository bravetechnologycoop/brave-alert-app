// In-house dependencies
import AlertApiService from '../../src/services/AlertApiService'
import * as FetchService from '../../src/services/FetchService'

// Setup mocks for this whole test file
jest.mock('../../src/services/FetchService', () => ({
  post: jest.fn(),
}))
jest.mock('../../src/services/CredentialsService', () => ({
  getApiKey: jest.fn().mockReturnValue('API_KEY'),
}))

describe('AlertApiService', () => {
  describe('testRequest', () => {
    it('calls POST with the correct URI, base URL, and headers', () => {
      const expectedParameters = {
        base: 'https://fakeBaseUrl',
        uri: '/alert/test',
        headers: {
          'X-API-KEY': 'API_KEY',
        },
      }

      AlertApiService.testRequest('https://fakeBaseUrl')

      expect(FetchService.post).toHaveBeenCalledWith(expectedParameters)
    })
  })

  describe('fakeEndpointRequest', () => {
    it('calls POST with the correct URI, base URL, and headers', () => {
      const expectedParameters = {
        base: 'https://fakeBaseUrl',
        uri: '/not/in/real/life',
        headers: {
          'X-API-KEY': 'API_KEY',
        },
      }

      AlertApiService.fakeEndpointRequest('https://fakeBaseUrl')

      expect(FetchService.post).toHaveBeenCalledWith(expectedParameters)
    })
  })

  describe('designateDeviceRequest', () => {
    it('calls POST with the correct URI, base URL, headers, and body', () => {
      const expectedParameters = {
        base: 'https://fakeBaseUrl',
        uri: '/alert/designatedevice',
        headers: {
          'X-API-KEY': 'API_KEY',
          'Content-Type': 'application/json',
        },
        body: {
          verificationCode: 'fakeVerificationCode',
        },
      }

      AlertApiService.designateDeviceRequest('https://fakeBaseUrl', 'fakeVerificationCode')

      expect(FetchService.post).toHaveBeenCalledWith(expectedParameters)
    })
  })
})
