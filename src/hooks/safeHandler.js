/* eslint-disable import/prefer-default-export */

// Third-party dependencies
import { useNavigation } from '@react-navigation/native'
import { useEffect, useRef, useState } from 'react'
import { isFunction } from 'lodash'

// In-house dependencies
import { safeReportError } from '../services/ErrorReportingService'
import SCREEN from '../navigation/ScreensEnum'
import Logger from '../services/Logger'

// Setup logger
const logger = new Logger('safeHandler')

// TODO provide a throttle param, for functions that return very quickly and don't have an obvious/safe
// hook for reset (e.g. add emergency contact)
export function useSafeHandler() {
  const navigation = useNavigation()
  const handlerState = useRef('ready') // one of ready, firing, cancelled
  const [isFiring, setIsFiring] = useState(false)

  useEffect(() => {
    return () => {
      handlerState.current = 'canceled'
    }
  }, [])

  function reset() {
    handlerState.current = 'ready'
    logger.info(`handler-state: ${handlerState.current}`)
  }

  async function fire(fn, options = {}) {
    const { rollbackScreen = SCREEN.ONBOARDING } = options

    function handleError(error) {
      safeReportError(error)
      navigation.navigate(SCREEN.ERROR, { originalScreen: rollbackScreen })
    }

    logger.info(`handler-state: ${handlerState.current}`)
    if (handlerState.current === 'firing' || handlerState.current === 'canceled') {
      logger.info('Already firing, ignoring')
      return
    }

    try {
      handlerState.current = 'firing'
      logger.info(`handler-state: ${handlerState.current}`)
      if (isFunction(setIsFiring)) {
        setIsFiring(true)
      }
      await fn()
    } catch (error) {
      handleError(error, rollbackScreen)
      reset()
    } finally {
      if (handlerState.current !== 'canceled' && isFunction(setIsFiring)) {
        setIsFiring(false)
      }
    }
  }

  return [fire, { reset, isFiring }]
}
