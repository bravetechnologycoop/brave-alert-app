// Third-party dependencies
import * as Sentry from '@sentry/react-native'

export function safeReportError(error, errorInfo) {
    try {
        console.log(error)

        Sentry.withScope((scope) => {
            if (errorInfo) {
              scope.setExtras(errorInfo)
            }
            Sentry.captureException(error)
          })
    } catch (err) {
        console.log('Error reporting error', err)
    }
}

export function simulateCrash() {
    throw 'This error was generated to test error handling and can be safely ignored'
}
