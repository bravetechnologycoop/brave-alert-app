// In-house dependencies
import SensorApiService from './SensorApiService'
import * as FetchService from './FetchService'

// Setup mocks for this whole test file
jest.mock('./FetchService', () => ({
    post: jest.fn()
}))
jest.mock('./CredentialsService', () => ({
    getApiKey: jest.fn().mockReturnValue('API_KEY')
}))

describe('SensorApiService', () => {
    describe('testRequest', () => {
        it('calls POST with the correct URI, base URL, and headers', () => {
            const expectedParameters = {
                uri: '/alert/test',
                base: 'https://sensor.com',
                headers: {
                    'X-API-KEY': 'API_KEY'
                },
            }

            SensorApiService.testRequest()

            expect(FetchService.post).toHaveBeenCalledWith(expectedParameters)
        })
    })

    describe('fakeEndpointRequest', () => {
        it('calls POST with the correct URI, base URL, and headers', () => {
            const expectedParameters = {
                uri: 'not/in/real/life',
                base: 'https://sensor.com',
                headers: {
                    'X-API-KEY': 'API_KEY'
                },
            }

            SensorApiService.fakeEndpointRequest()

            expect(FetchService.post).toHaveBeenCalledWith(expectedParameters)
        })
    })
})
