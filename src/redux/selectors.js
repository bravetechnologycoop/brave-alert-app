import {
    get,
} from 'lodash'

export function getAlerts(state) {
    return get(state, 'alerts')
}