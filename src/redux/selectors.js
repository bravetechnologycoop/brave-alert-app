import { get } from 'lodash'

function getAlerts(state) {
  return get(state, 'alerts')
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

function getNotifications(state) {
  return get(state, 'notifications')
}

export { getAlerts, getIsButtonsLocation, getIsDemo, getIsSensorLocation, getLocation, getLocationName, getNotifications }
