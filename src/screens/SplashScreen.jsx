// Third-party dependencies
import React, { useEffect } from 'react'
import { ActivityIndicator, SafeAreaView, StyleSheet, StatusBar, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import OneSignal from 'react-native-onesignal'
import { BUTTONS_BASE_URL, SENSOR_BASE_URL, ONESIGNAL_APP_ID } from '@env'

// In-house dependencies
import { useSafeHandler } from '../hooks'
import { setIsButtonsLocation, setIsSensorLocation, setLocationName } from '../redux/slices/locationSlice'
import AlertApiService from '../services/AlertApiService'
import colors from '../resources/colors'
import SCREEN from '../navigation/ScreensEnum'
import { setAlerts } from '../redux/slices/alertsSlice'
import Logger from '../services/Logger'

const logger = new Logger('SplashScreen')

const styles = StyleSheet.create({
  alertText: {
    color: colors.greyscaleLightest,
    fontFamily: 'Roboto-Black',
    fontSize: 20,
    textAlign: 'center',
    letterSpacing: 6,
    marginBottom: 80,
  },
  braveText: {
    color: colors.greyscaleLightest,
    fontFamily: 'Roboto-Black',
    fontSize: 30,
    textAlign: 'center',
    letterSpacing: 7,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryMedium,
  },
})

function SplashScreen() {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [fireGetLocationRequest] = useSafeHandler()
  const [fireGetActiveAlertsRequest, fireGetActiveAlertsRequestOptions] = useSafeHandler()

  // Runs the first time this page is rendered
  useEffect(() => {
    async function handle() {
      logger.debug('Try to get the location from both Buttons and Sensors')
      const promises = [AlertApiService.getLocation(BUTTONS_BASE_URL), AlertApiService.getLocation(SENSOR_BASE_URL)]
      const [buttonsLocation, sensorLocation] = await Promise.all(promises)
      const isSensorLocation = !sensorLocation || Object.keys(sensorLocation).length > 0 || sensorLocation.constructor !== Object
      const isButtonsLocation = !buttonsLocation || Object.keys(buttonsLocation).length > 0 || buttonsLocation.constructor !== Object
      if (isSensorLocation) {
        logger.info(`Retrieved sensor location ${sensorLocation.name}`)
        dispatch(setLocationName(sensorLocation.name))
        dispatch(setIsSensorLocation(true))
      }
      if (isButtonsLocation) {
        logger.info(`Retrieved buttons location ${buttonsLocation.name}`)
        // If there was both a sensors and a buttons location, the buttons location name will be the one that is used
        dispatch(setLocationName(buttonsLocation.name))
        dispatch(setIsButtonsLocation(true))
      }
      if (isButtonsLocation || isSensorLocation) {
        navigation.navigate(SCREEN.MAIN)
      } else {
        navigation.navigate(SCREEN.ONBOARDING)
      }
    }

    fireGetLocationRequest(handle, {
      rollbackScreen: SCREEN.ONBOARDING,
    })
  }, [])

  // OneSignal Init Code
  OneSignal.setLogLevel(6, 0)
  OneSignal.setAppId(ONESIGNAL_APP_ID)

  // Prompt for push on iOS
  OneSignal.promptForPushNotificationsWithUserResponse(response => {
    logger.debug('OneSignal: prompt response:', response)
  })

  function displayAlerts() {
    async function handle() {
      logger.debug('Try to get the active alerts from both Buttons and Sensors')
      const promises = [AlertApiService.getActiveAlerts(BUTTONS_BASE_URL) /* , AlertApiService.getActiveAlerts(SENSOR_BASE_URL) */]
      const sensorsAlerts = []
      const [buttonsAlerts /* , sensorsAlerts */] = await Promise.all(promises)

      // Combine the results
      const activeAlerts = buttonsAlerts.concat(sensorsAlerts)

      dispatch(setAlerts(activeAlerts))

      if (activeAlerts && activeAlerts.length > 0) {
        navigation.navigate(SCREEN.ALERT)
      }
    }

    fireGetActiveAlertsRequest(handle)

    fireGetActiveAlertsRequestOptions.reset()
  }

  // Method for handling notifications opened
  OneSignal.setNotificationOpenedHandler(notification => {
    logger.debug('OneSignal: notification opened:', notification)

    displayAlerts()
  })

  // Method for handling notifications received while app in foreground
  OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
    const notification = notificationReceivedEvent.getNotification()
    logger.info('OneSignal: notification: ', notification)

    // Don't show the native notification
    notificationReceivedEvent.complete(null)

    displayAlerts()
  })

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Text style={styles.braveText}>BRAVE</Text>
        <Text style={styles.alertText}>ALERT</Text>
        <ActivityIndicator size="large" color={colors.greyscaleLighter} />
      </SafeAreaView>
    </>
  )
}

export default SplashScreen
