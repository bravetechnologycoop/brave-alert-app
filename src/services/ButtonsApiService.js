// All the functions that call the Brave Buttons API

// In-house dependencies
import { BUTTONS_BASE_URL } from '@env'
import { post } from './FetchService'
import { getApiKey } from './CredentialsService'

const buttonRequest = {
  base: `https://${BUTTONS_BASE_URL}`,
  headers: {
    'X-API-KEY': getApiKey(),
  },
}

async function testRequest() {
  return post({
    uri: '/alert/test',
    ...buttonRequest,
  })
}

async function fakeEndpointRequest() {
  return post({
    uri: 'not/in/real/life',
    ...buttonRequest,
  })
}

export default {
  fakeEndpointRequest,
  testRequest,
}
