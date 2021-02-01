import { get } from 'lodash'

function getAlerts(state) {
  return get(state, 'alerts')
}

function getNotifications(state) {
  return get(state, 'notifications')
}

export { getAlerts, getNotifications }
