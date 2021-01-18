// Third-party dependencies
import { getUniqueId } from 'react-native-device-info'

// In-house dependencies
import * as CredentialsService from './CredentialsService'

// Setup mocks for this whole test file
getUniqueId.mockReturnValue('DEVICE_ID')

describe('CredentialsService', () => {
    let testContext

    beforeEach(() => {
        testContext = {}
    })

    describe('getApiKey', () => {
        it('at this point, should just return the device ID', () => {
            const actualApiKey = CredentialsService.getApiKey()

            expect(actualApiKey).toBe('DEVICE_ID')
        })
    })

    describe('sanitizeApiKey', () => {
        beforeEach(() => {
            testContext.apiKey = CredentialsService.getApiKey()
        })

        it('replaces the device ID at the beginning of the string', () => {
            const input = `${testContext.apiKey}andmanycharactersafterwards`

            const sanitizedString = CredentialsService.sanitizeApiKey(input)

            expect(sanitizedString).toBe('SANITIZED_API_KEYandmanycharactersafterwards')
        })

        it('replaces the device ID in the middle of the string', () => {
            const input = `manycharactersbefore${testContext.apiKey}andmanycharactersafterwards`

            const sanitizedString = CredentialsService.sanitizeApiKey(input)

            expect(sanitizedString).toBe('manycharactersbeforeSANITIZED_API_KEYandmanycharactersafterwards')
        })

        it('replaces the device ID at the end of the string', () => {
            const input = `manycharactersbefore${testContext.apiKey}`

            const sanitizedString = CredentialsService.sanitizeApiKey(input)

            expect(sanitizedString).toBe('manycharactersbeforeSANITIZED_API_KEY')
        })

        it('replaces the device ID more than once', () => {
            const input = `${testContext.apiKey}and${testContext.apiKey}more${testContext.apiKey}`

            const sanitizedString = CredentialsService.sanitizeApiKey(input)

            expect(sanitizedString).toBe('SANITIZED_API_KEYandSANITIZED_API_KEYmoreSANITIZED_API_KEY')
        })
        
        it('does not replace anything if the device ID is not in the string', () => {
            const input = `before${testContext.apiKey.substring(1)}after`    // The API key without its first character

            const sanitizedString = CredentialsService.sanitizeApiKey(input)

            expect(sanitizedString).toBe('beforeEVICE_IDafter')
        })
    })
})
