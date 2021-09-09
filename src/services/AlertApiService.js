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

async function acknowledgeAlertSessionRequest(baseUrl, sessionId) {
  return post({
    base: baseUrl,
    uri: '/alert/acknowledgeAlertSession',
    body: {
      sessionId,
    },
    headers: {
      'X-API-KEY': getApiKey(),
      'Content-Type': 'application/json',
    },
  })
}

async function setIncidentCategoryRequest(baseUrl, sessionId, incidentCategory) {
  return post({
    base: baseUrl,
    uri: '/alert/setIncidentCategory',
    body: {
      sessionId,
      incidentCategory,
    },
    headers: {
      'X-API-KEY': getApiKey(),
      'Content-Type': 'application/json',
    },
  })
}

export default {
  acknowledgeAlertSessionRequest,
  designateDeviceRequest,
  getHistoricAlerts,
  getLocation,
  getNewNotificationsCountRequest,
  setIncidentCategoryRequest,
}
