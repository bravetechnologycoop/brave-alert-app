// Third-party dependencies
import React from 'react'
import DeviceInfo from 'react-native-device-info'
import * as Sentry from '@sentry/react-native'
import { Provider } from 'react-redux'
import OneSignal from 'react-native-onesignal'
import { ONESIGNAL_APP_ID, SENTRY_DSN, SENTRY_ENV } from '@env'

// In-house dependencies
import RootStack from './navigation/RootStack'
import store from './redux/store'

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
// END OneSignal Init Code

//Prompt for push on iOS
// OneSignal.promptForPushNotificationsWithUserResponse(response => {
//   console.log('Prompt response:', response)
// })

//Method for handling notifications received while app in foreground
OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
  console.log('OneSignal: notification will show in foreground:', notificationReceivedEvent)
  let notification = notificationReceivedEvent.getNotification()
  console.log('notification: ', notification)
  const data = notification.additionalData
  console.log('additionalData: ', data)
  // Complete with null means don't show a notification.
  notificationReceivedEvent.complete(notification)
})

//Method for handling notifications opened
OneSignal.setNotificationOpenedHandler(notification => {
  console.log('OneSignal: notification opened:', notification)
})

export default function App() {
  return (
    <Provider store={store}>
      <RootStack />
    </Provider>
  )
}
