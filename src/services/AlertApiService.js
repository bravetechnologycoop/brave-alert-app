// All the functions that call servers that use Brave Alert Lib

// In-house dependencies
import { post, get } from './FetchService'
import { getApiKey } from './CredentialsService'

async function designateDeviceRequest(baseUrl, verificationCode, responderPushId) {
  return post({
    base: baseUrl,
    uri: '/alert/designatedevice',
    body: {
      verificationCode,
      responderPushId,
    },
    headers: {
      'X-API-KEY': getApiKey(),
      'Content-Type': 'application/json',
    },
  })
}

async function getLocation(baseUrl) {
  return get({
    base: baseUrl,
    uri: '/alert/location',
    headers: {
      'X-API-KEY': getApiKey(),
    },
    transformResponse: JSON.parse,
  })
}

async function getHistoricAlerts(baseUrl, maxHistoricAlerts) {
  return get({
    base: baseUrl,
    uri: `/alert/historicAlerts`,
    params: {
      maxHistoricAlerts,
    },
    headers: {
      'X-API-KEY': getApiKey(),
      'Content-Type': 'application/json',
    },
    transformResponse: JSON.parse,
  })
}

async function getNewNotificationsCountRequest(baseUrl) {
  return get({
    base: baseUrl,
    uri: '/alert/newNotificationsCount',
    headers: {
      'X-API-KEY': getApiKey(),
    },
    transformResponse: JSON.parse,
  })
}

async function testRequest(baseUrl) {
  return post({
    base: baseUrl,
    uri: '/alert/test',
    headers: {
      'X-API-KEY': getApiKey(),
    },
  })
}

async function fakeEndpointRequest(baseUrl) {
  return post({
    base: baseUrl,
    uri: '/not/in/real/life',
    headers: {
      'X-API-KEY': getApiKey(),
    },
  })
}

export default {
  designateDeviceRequest,
  getNewNotificationsCountRequest,
  fakeEndpointRequest,
  getHistoricAlerts,
  getLocation,
  testRequest,
}
