// Third-party dependencies
import React from 'react'
import DeviceInfo from 'react-native-device-info'
import * as Sentry from '@sentry/react-native'
import { Provider } from 'react-redux'
import Portal from '@burstware/react-native-portal'
import { SENTRY_DSN, SENTRY_ENV } from '@env'

// In-house dependencies
import RootStack from './navigation/RootStack'
import AlertManager from './components/AlertManager'
import store from './redux/store'

// Setup Sentry
if (SENTRY_DSN && SENTRY_ENV) {
  Sentry.init({
    release: `brave-alert-app@${DeviceInfo.getVersion()}`, // e.g. brave-alert-app@2.3.0
    dsn: SENTRY_DSN,
    environment: SENTRY_ENV,
  })
}

export default function App() {
  return (
    <Provider store={store}>
      <Portal.Host>
        <RootStack />
        <AlertManager />
      </Portal.Host>
    </Provider>
  )
}
