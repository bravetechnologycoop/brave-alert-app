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
import ButtonsApiService from './ButtonsApiService'
import * as FetchService from './FetchService'

describe('ButtonsApiService', () => {
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
                base: 'https://buttons.com',
                headers: {
                    'X-API-KEY': 'DEVICE_ID'
                },
            }

            ButtonsApiService.testRequest()

            expect(FetchService.post).to.have.been.calledWith(expectedParameters)
        })
    })

    describe('fakeEndpointRequest', () => {
        it('calls POST with the correct URI', () => {
            const expectedParameters = {
                uri: 'not/in/real/life',
                base: 'https://buttons.com',
                headers: {
                    'X-API-KEY': 'DEVICE_ID'
                },
            }

            ButtonsApiService.fakeEndpointRequest()

            expect(FetchService.post).to.have.been.calledWith(expectedParameters)
        })
    })
})