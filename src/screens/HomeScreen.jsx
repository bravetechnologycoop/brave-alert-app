// Third-party dependencies
import React, { useCallback } from 'react'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { SafeAreaView, ScrollView, StyleSheet, StatusBar, Text, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { BUTTONS_BASE_URL } from '@env'

// In-house dependencies
import colors from '../resources/colors'
import { getIsButtonsLocation, getIsSensorLocation, getNewNotificationsCount } from '../redux/selectors'
import { setNewNotificationsCount } from '../redux/slices/newNotificationsCountSlice'
import { useSafeHandler } from '../hooks'
import AlertApiService from '../services/AlertApiService'
import SCREEN from '../navigation/ScreensEnum'
import HomeScreenInstructions from '../components/HomeScreenInstructions'
import HomeScreenNotificationsButton from '../components/HomeScreenNotificationsButton'
import AlertManager from '../components/AlertManager'

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: colors.greyscaleLightest,
  },
  body: {
    backgroundColor: colors.greyscaleLightest,
  },
  welcomeText: {
    color: colors.primaryDark,
    fontFamily: 'Roboto-Black',
    fontSize: 25,
    lineHeight: 30,
    textAlign: 'center',
    letterSpacing: 4,
    marginTop: 70,
  },
  noNewNotificationsText: {
    color: colors.greyscaleLight,
    fontFamily: 'Roboto-Regular',
    fontSize: 18,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 35,
    marginLeft: 60,
    marginRight: 60,
  },
})

function HomeScreen() {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const renderButtonsInstructions = useSelector(getIsButtonsLocation)
  const renderSensorsInstructions = useSelector(getIsSensorLocation)
  const newNotificationsCount = useSelector(getNewNotificationsCount)
  const [fireGetNewNotificationsCountRequest, fireGetNewNotificationsCountRequestOptions] = useSafeHandler()

  useFocusEffect(
    useCallback(() => {
      async function handle() {
        // TODO: enable sensors request
        const promises = [
          AlertApiService.getNewNotificationsCountRequest(BUTTONS_BASE_URL),
          // AlertApiService.getNewNotificationsCountRequest(SENSOR_BASE_URL),
        ]
        const [buttonsResult /* , sensorsResult */] = await Promise.all(promises)
        dispatch(setNewNotificationsCount(buttonsResult /* + sensorsResult */))
      }

      fireGetNewNotificationsCountRequest(handle, {
        rollbackScreen: SCREEN.HOME,
      })

      fireGetNewNotificationsCountRequestOptions.reset()
    }, []),
  )

  function onPress() {
    navigation.navigate(SCREEN.NOTIFICATIONS)
  }

  return (
    <>
      <AlertManager />
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
          <View style={styles.body}>
            <Text style={styles.welcomeText}>WELCOME</Text>
            {newNotificationsCount > 0 ? (
              <HomeScreenNotificationsButton newNotificationsCount={newNotificationsCount} onPress={onPress} />
            ) : (
              <Text style={styles.noNewNotificationsText}>You have no new notifications or active alerts.</Text>
            )}
            <HomeScreenInstructions renderButtonsInstructions={renderButtonsInstructions} renderSensorsInstructions={renderSensorsInstructions} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

export default HomeScreen
