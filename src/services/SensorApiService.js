// All the functions that call the Brave Sensor API

// In-house dependencies
import {
    SENSOR_BASE_URL,
} from '@env'
import { post } from './FetchService'
import {
    getApiKey,
} from './CredentialsService'

const sensorRequest = {
    base: SENSOR_BASE_URL,
    headers: {
        'X-API-KEY': getApiKey()
    }
}

async function testRequest() {
    return post({
        uri: '/alert/test',
        ...sensorRequest,
    })
}

async function fakeEndpointRequest() {
    return post({
        uri: 'not/in/real/life',
        ...sensorRequest,
    })
}

export default {
    fakeEndpointRequest,
    testRequest,
}
