// All the functions that call the Brave Alert API

import { post } from './FetchService'

async function testRequest() {
    return post({
        uri: '/alert/test',
    })
}

async function fakeEndpointRequest() {
    return post({
        uri: 'not/in/real/life'
    })
}

export {
    fakeEndpointRequest,
    testRequest,
}
