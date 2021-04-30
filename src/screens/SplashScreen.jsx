// Third-party dependencies
import React, { useEffect } from 'react'
import { SafeAreaView, StyleSheet, StatusBar, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { BUTTONS_BASE_URL, SENSOR_BASE_URL } from '@env'

// In-house dependencies
import { useSafeHandler } from '../hooks'
import { setIsButtonsLocation, setIsSensorLocation, setLocationName } from '../redux/slices/locationSlice'
import AlertApiService from '../services/AlertApiService'
import colors from '../resources/colors'
import SCREEN from '../navigation/ScreensEnum'
import Logger from '../services/Logger'

const logger = new Logger('SplashScreen')

const styles = StyleSheet.create({
  alertText: {
    color: colors.greyscaleLightest,
    fontFamily: 'Roboto-Black',
    fontSize: 20,
    textAlign: 'center',
    letterSpacing: 6,
    marginBottom: 100,
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
  loadingText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 20,
    color: colors.greyscaleLightest,
    textAlign: 'center',
    textAlignVertical: 'center',
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

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Text style={styles.braveText}>BRAVE</Text>
        <Text style={styles.alertText}>ALERT</Text>
        <Text style={styles.loadingText}>Loading...</Text>
      </SafeAreaView>
    </>
  )
}

export default SplashScreen
