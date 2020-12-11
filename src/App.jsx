// Third-party dependencies
import React from 'react'
import DeviceInfo from 'react-native-device-info'
import * as Sentry from '@sentry/react-native'

// In-house dependencies
import {
    SENTRY_DSN,
    SENTRY_ENV,
} from '@env'
import RootStack from './navigation/RootStack'

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
        <RootStack />
    )
}