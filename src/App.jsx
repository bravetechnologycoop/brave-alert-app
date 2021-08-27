// Third-party dependencies
import React from 'react'
import DeviceInfo from 'react-native-device-info'
import * as Sentry from '@sentry/react-native'
import { Provider } from 'react-redux'
import OneSignal from 'react-native-onesignal'
import { Alert } from 'react-native'
import { ONESIGNAL_APP_ID, SENTRY_DSN, SENTRY_ENV } from '@env'

// In-house dependencies
import RootStack from './navigation/RootStack'
import store from './redux/store'
import Logger from './services/Logger'

const logger = new Logger('App')

// Setup Sentry
if (SENTRY_DSN && SENTRY_ENV) {
  Sentry.init({
    release: `brave-alert-app@${DeviceInfo.getVersion()}`, // e.g. brave-alert-app@2.3.0
    dsn: SENTRY_DSN,
    environment: SENTRY_ENV,
  })
}

// OneSignal Init Code
OneSignal.setLogLevel(6, 0)
OneSignal.setAppId(ONESIGNAL_APP_ID)

// Prompt for push on iOS
OneSignal.promptForPushNotificationsWithUserResponse(response => {
  logger.debug('Prompt response:', response)
})

// Method for handling notifications received while app in foreground
OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
  const notification = notificationReceivedEvent.getNotification()
  logger.info('notification: ', notification)

  // TODO update global state, which will render the Alert(s)
  Alert.alert('Alert', notification.body)

  // Don't show the native notification
  notificationReceivedEvent.complete(null)
})

// Method for handling notifications opened
OneSignal.setNotificationOpenedHandler(notification => {
  logger.debug('OneSignal: notification opened:', notification)
})

export default function App() {
  return (
    <Provider store={store}>
      <RootStack />
    </Provider>
  )
}
