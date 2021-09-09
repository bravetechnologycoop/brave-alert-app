// Third-party dependencies
import React, { useEffect } from 'react'
import { ActivityIndicator, SafeAreaView, StyleSheet, StatusBar, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import OneSignal from 'react-native-onesignal'
import { BUTTONS_BASE_URL, SENSOR_BASE_URL, ONESIGNAL_APP_ID } from '@env'

// In-house dependencies
import { ALERT_TYPE, ALERT_STATUS } from '../constants'
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
    // TODO get from API call
    dispatch(
      setAlerts([
        {
          id: 'guid-123-abc',
          alertStatus: ALERT_STATUS.NEW,
          location: 'Room 302',
          alertType: ALERT_TYPE.BUTTONS_NOT_URGENT,
          categories: ['Safer Use', 'Overdose', 'Mental Health', 'Other'],
        },
        {
          id: 'guid-123-abc2',
          alertStatus: ALERT_STATUS.REMINDING,
          location: 'Room 302',
          alertType: ALERT_TYPE.SENSOR_DURATION,
          categories: ['Safer Use', 'Overdose', 'Mental Health', 'Other'],
        },
        {
          id: 'guid-123-abc3',
          alertStatus: ALERT_STATUS.RESPONDING,
          location: 'Room 302',
          alertType: ALERT_TYPE.BUTTONS_NOT_URGENT,
          categories: ['Safer Use', 'Overdose', 'Mental Health', 'Other'],
        },
        {
          id: 'guid-123-abc4',
          alertStatus: ALERT_STATUS.REPORTING,
          location: 'Room 302',
          alertType: ALERT_TYPE.BUTTONS_NOT_URGENT,
          categories: ['Safer Use', 'Overdose', 'Mental Health', 'Other'],
        },
      ]),
    )
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
