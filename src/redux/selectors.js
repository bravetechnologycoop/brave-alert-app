import { get } from 'lodash'

function getAlerts(state) {
  return get(state, 'alerts')
}

function getErrorMessage(state) {
  return get(state, 'errorMessage')
}

function getIsButtonsLocation(state) {
  return get(state, 'location.isButtonsLocation')
}

function getIsDemo(state) {
  return get(state, 'location.isDemo')
}

function getIsSensorLocation(state) {
  return get(state, 'location.isSensorLocation')
}

function getLocation(state) {
  return get(state, 'location')
}

function getLocationName(state) {
  return get(state, 'location.name')
}

function getNewNotificationsCount(state) {
  return get(state, 'newNotificationsCount')
}

export { getAlerts, getErrorMessage, getIsButtonsLocation, getIsDemo, getIsSensorLocation, getLocation, getLocationName, getNewNotificationsCount }
