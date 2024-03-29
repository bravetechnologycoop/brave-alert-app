export const CHATBOT_STATE = {
  STARTED: 'Started',
  WAITING_FOR_REPLY: 'Waiting for reply',
  RESPONDING: 'Responding',
  WAITING_FOR_CATEGORY: 'Waiting for incident category',
  WAITING_FOR_DETAILS: 'Waiting for incident details',
  COMPLETED: 'Completed',
}

export const ALERT_TYPE = {
  BUTTONS_NOT_URGENT: 'BUTTONS_NOT_URGENT',
  BUTTONS_URGENT: 'BUTTONS_URGENT',
  SENSOR_STILLNESS: 'SENSOR_STILLNESS',
  SENSOR_DURATION: 'SENSOR_DURATION',
  SENSOR_UNKNOWN: 'SENSOR_UNKNOWN',
}

export const NOTIFICATION_STATUS = {
  NEW: 'NEW',
  READ: 'READ',
  CONFIRMED: 'CONFIRMED',
}
