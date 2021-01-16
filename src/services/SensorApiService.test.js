// Third-party dependencies
import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import {
    afterEach,
    beforeEach,
    describe,
    it,
} from 'mocha'

chai.use(sinonChai)

// In-house dependencies
import SensorApiService from './SensorApiService'
import * as FetchService from './FetchService'

describe('SensorApiService', () => {
    beforeEach(() => {
        sinon.stub(FetchService, 'post')
    })

    afterEach(() => {
        FetchService.post.restore()
    })

    describe('testRequest', () => {
        it('calls POST with the correct URI', () => {
            const expectedParameters = {
                uri: '/alert/test',
                base: 'https://sensor.com',
                headers: {
                    'X-API-KEY': 'DEVICE_ID'
                },
            }

            SensorApiService.testRequest()

            expect(FetchService.post).to.have.been.calledWith(expectedParameters)
        })
    })

    describe('fakeEndpointRequest', () => {
        it('calls POST with the correct URI', () => {
            const expectedParameters = {
                uri: 'not/in/real/life',
                base: 'https://sensor.com',
                headers: {
                    'X-API-KEY': 'DEVICE_ID'
                },
            }

            SensorApiService.fakeEndpointRequest()

            expect(FetchService.post).to.have.been.calledWith(expectedParameters)
        })
    })
})