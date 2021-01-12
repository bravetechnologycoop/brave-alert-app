// Third-party dependencies
import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
import {
    beforeEach,
    describe,
    it,
} from 'mocha'

// In-house dependencies
import * as CredentialsService from './CredentialsService'

// Setup Chai
chai.use(sinonChai)

describe('CredentialsService', () => {
    describe('getApiKey', () => {
        it('at this point, should just return the device ID', () => {
            const actualApiKey = CredentialsService.getApiKey()

            expect(actualApiKey).to.equal('DEVICE_ID')
        })
    })

    describe('sanitizeApiKey', () => {
        beforeEach(() => {
            this.apiKey = CredentialsService.getApiKey()
        })

        it('replaces the device ID at the beginning of the string', () => {
            const input = `${this.apiKey}andmanycharactersafterwards`

            const sanitizedString = CredentialsService.sanitizeApiKey(input)

            expect(sanitizedString).to.equal('SANITIZED_API_KEYandmanycharactersafterwards')
        })

        it('replaces the device ID in the middle of the string', () => {
            const input = `manycharactersbefore${this.apiKey}andmanycharactersafterwards`

            const sanitizedString = CredentialsService.sanitizeApiKey(input)

            expect(sanitizedString).to.equal('manycharactersbeforeSANITIZED_API_KEYandmanycharactersafterwards')
        })

        it('replaces the device ID at the end of the string', () => {
            const input = `manycharactersbefore${this.apiKey}`

            const sanitizedString = CredentialsService.sanitizeApiKey(input)

            expect(sanitizedString).to.equal('manycharactersbeforeSANITIZED_API_KEY')
        })

        it('replaces the device ID more than once', () => {
            const input = `${this.apiKey}and${this.apiKey}more${this.apiKey}`

            const sanitizedString = CredentialsService.sanitizeApiKey(input)

            expect(sanitizedString).to.equal('SANITIZED_API_KEYandSANITIZED_API_KEYmoreSANITIZED_API_KEY')
        })
        
        it('does not replace anything if the device ID is not in the string', () => {
            const input = `before${this.apiKey.substring(1)}after`    // The API key without its first character

            const sanitizedString = CredentialsService.sanitizeApiKey(input)

            expect(sanitizedString).to.equal('beforeEVICE_IDafter')
        })
    })
})
