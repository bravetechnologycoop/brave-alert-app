// Functions related to reporting errors

// Third-party dependencies
import * as Sentry from '@sentry/react-native'
import Logger from './Logger'

// Setup logger
const logger = new Logger('ErrorReportingService')

function safeReportError(error, errorInfo) {
  try {
    logger.error(error)

    Sentry.withScope(scope => {
      if (errorInfo) {
        scope.setExtras(errorInfo)
      }
      Sentry.captureException(error)
    })
  } catch (err) {
    logger.error(`Error reporting error: ${JSON.stringify(err)}`)
  }
}

function simulateCrash() {
  throw new Error('This error was generated to test error handling and can be safely ignored')
}

export { safeReportError, simulateCrash }
