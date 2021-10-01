// In-house dependencies
import AlertApiService from '../../src/services/AlertApiService'
import * as FetchService from '../../src/services/FetchService'

// Setup mocks for this whole test file
const fakeApiKey = 'API_KEY'
jest.mock('../../src/services/FetchService', () => ({
  get: jest.fn(),
  post: jest.fn(),
}))
jest.mock('../../src/services/CredentialsService', () => ({
  getApiKey: jest.fn().mockReturnValue(fakeApiKey),
}))

describe('AlertApiService', () => {
  describe('designateDeviceRequest', () => {
    it('calls POST with the correct URI, base URL, headers, and body', async () => {
      const fakeBaseUrl = 'https://fakeBaseUrl'
      const fakeVerificationCode = 'fakeVerificationCode'
      const fakeResponderPushId = 'fakeResponderPushId'

      const expectedParameters = {
        base: fakeBaseUrl,
        uri: '/alert/designatedevice',
        headers: {
          'X-API-KEY': fakeApiKey,
          'Content-Type': 'application/json',
        },
        body: {
          verificationCode: fakeVerificationCode,
          responderPushId: fakeResponderPushId,
        },
      }

      await AlertApiService.designateDeviceRequest(fakeBaseUrl, fakeVerificationCode, fakeResponderPushId)

      expect(FetchService.post).toHaveBeenCalledWith(expectedParameters)
    })
  })

  describe('getLocation', () => {
    it('calls POST with the correct URI, base URL, headers, and body', async () => {
      const fakeBaseUrl = 'https://fakeBaseUrl'

      const expectedParameters = {
        base: fakeBaseUrl,
        uri: '/alert/location',
        headers: {
          'X-API-KEY': fakeApiKey,
        },
        transformResponse: JSON.parse,
      }

      await AlertApiService.getLocation(fakeBaseUrl)

      expect(FetchService.get).toHaveBeenCalledWith(expectedParameters)
    })
  })

  describe('getActiveAlerts', () => {
    it('calls POST with the correct URI, base URL, headers, and body', async () => {
      const fakeBaseUrl = 'https://fakeBaseUrl'

      const expectedParameters = {
        base: fakeBaseUrl,
        uri: '/alert/activeAlerts',
        headers: {
          'X-API-KEY': fakeApiKey,
          'Content-Type': 'application/json',
        },
        transformResponse: JSON.parse,
      }

      await AlertApiService.getActiveAlerts(fakeBaseUrl)

      expect(FetchService.get).toHaveBeenCalledWith(expectedParameters)
    })
  })

  describe('getHistoricAlerts', () => {
    it('calls POST with the correct URI, base URL, headers, and body', async () => {
      const fakeBaseUrl = 'https://fakeBaseUrl'
      const fakeMaxHistoricAlerts = 100

      const expectedParameters = {
        base: fakeBaseUrl,
        uri: '/alert/historicAlerts',
        params: {
          maxHistoricAlerts: fakeMaxHistoricAlerts,
        },
        headers: {
          'X-API-KEY': fakeApiKey,
          'Content-Type': 'application/json',
        },
        transformResponse: JSON.parse,
      }

      await AlertApiService.getHistoricAlerts(fakeBaseUrl, fakeMaxHistoricAlerts)

      expect(FetchService.get).toHaveBeenCalledWith(expectedParameters)
    })
  })

  describe('getNewNotificationsCountRequest', () => {
    it('calls POST with the correct URI, base URL, headers, and body', async () => {
      const fakeBaseUrl = 'https://fakeBaseUrl'

      const expectedParameters = {
        base: fakeBaseUrl,
        uri: '/alert/newNotificationsCount',
        headers: {
          'X-API-KEY': fakeApiKey,
        },
        transformResponse: JSON.parse,
      }

      await AlertApiService.getNewNotificationsCountRequest(fakeBaseUrl)

      expect(FetchService.get).toHaveBeenCalledWith(expectedParameters)
    })
  })

  describe('acknowledgeAlertSessionRequest', () => {
    it('calls POST with the correct URI, base URL, headers, and body', async () => {
      const fakeBaseUrl = 'https://fakeBaseUrl'
      const fakeSessionId = 'fakeSessionId'

      const expectedParameters = {
        base: 'https://fakeBaseUrl',
        uri: '/alert/acknowledgeAlertSession',
        headers: {
          'X-API-KEY': fakeApiKey,
          'Content-Type': 'application/json',
        },
        body: {
          sessionId: fakeSessionId,
        },
        transformResponse: JSON.parse,
      }

      await AlertApiService.acknowledgeAlertSessionRequest(fakeBaseUrl, fakeSessionId)

      expect(FetchService.post).toHaveBeenCalledWith(expectedParameters)
    })
  })

  describe('respondToAlertSessionRequest', () => {
    it('calls POST with the correct URI, base URL, headers, and body', async () => {
      const fakeBaseUrl = 'https://fakeBaseUrl'
      const fakeSessionId = 'fakeSessionId'

      const expectedParameters = {
        base: fakeBaseUrl,
        uri: '/alert/respondToAlertSession',
        headers: {
          'X-API-KEY': fakeApiKey,
          'Content-Type': 'application/json',
        },
        body: {
          sessionId: fakeSessionId,
        },
        transformResponse: JSON.parse,
      }

      await AlertApiService.respondToAlertSessionRequest(fakeBaseUrl, fakeSessionId)

      expect(FetchService.post).toHaveBeenCalledWith(expectedParameters)
    })
  })

  describe('setIncidentCategoryRequest', () => {
    it('calls POST with the correct URI, base URL, headers, and body', async () => {
      const fakeBaseUrl = 'https://fakeBaseUrl'
      const fakeSessionId = 'fakeSessionId'
      const fakeIncidentCategory = 'fakeIncidentCategory'

      const expectedParameters = {
        base: fakeBaseUrl,
        uri: '/alert/setIncidentCategory',
        headers: {
          'X-API-KEY': fakeApiKey,
          'Content-Type': 'application/json',
        },
        body: {
          sessionId: fakeSessionId,
          incidentCategory: fakeIncidentCategory,
        },
        transformResponse: JSON.parse,
      }

      await AlertApiService.setIncidentCategoryRequest(fakeBaseUrl, fakeSessionId, fakeIncidentCategory)

      expect(FetchService.post).toHaveBeenCalledWith(expectedParameters)
    })
  })
})
