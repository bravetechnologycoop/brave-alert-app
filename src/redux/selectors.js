import { get } from 'lodash'

function getAlerts(state) {
  return get(state, 'alerts')
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

export { getAlerts, getLocation, getLocationName, getNotifications }
