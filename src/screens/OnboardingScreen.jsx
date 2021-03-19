// Third-party dependencies
import React from 'react'
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { faCheckSquare, faExclamationCircle, faRunning } from '@fortawesome/pro-light-svg-icons'
import { BUTTONS_BASE_URL } from '@env'

// In-house dependencies
import { useSafeHandler } from '../hooks'
import AlertApiService from '../services/AlertApiService'
import SCREEN from '../navigation/ScreensEnum'
import BasicButton from '../components/BasicButton'
import Cards from '../components/Cards/Cards'
import ImageCard from '../components/Cards/ImageCard'
import ContactBraveBoxesCard from '../components/Cards/ContactBraveBoxesCard'
import colors from '../resources/colors'

const styles = StyleSheet.create({
  alertText: {
    color: colors.primaryMedium,
    fontFamily: 'Roboto-Black',
    fontSize: 20,
    textAlign: 'center',
    letterSpacing: 6,
    marginBottom: 25,
  },
  braveText: {
    color: colors.primaryMedium,
    fontFamily: 'Roboto-Black',
    fontSize: 30,
    textAlign: 'center',
    letterSpacing: 7,
    marginBottom: 10,
  },
  button: {
    marginBottom: 41,
  },
  cards: {
    marginBottom: 25,
  },
  container: {
    backgroundColor: colors.greyscaleLightest,
    height: '100%',
  },
  welcomeText: {
    color: colors.greyscaleDark,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 60,
    marginBottom: 20,
  },
})

function OnboardingScreen() {
  const navigation = useNavigation()
  const [fireDesignateDeviceRequest, fireDesignateDeviceRequestOptions] = useSafeHandler()

  function handleButtonPress() {
    async function handle() {
      // TODO generate a random verification code and put in the store
      const verificationCode = 'abc123'

      // Log device ID and verification code
      const promises = [
        AlertApiService.designateDeviceRequest(BUTTONS_BASE_URL, verificationCode),
        // TODO hit the Sensor endpoint once it has the right version of brave-alert-lib
        // AlertApiService.designateDeviceRequest(SENSOR_BASE_URL, verificationCode),
      ]
      await Promise.all(promises)

      // TODO Change this to open the connection pop-up
      navigation.navigate(SCREEN.MAIN)
    }

    fireDesignateDeviceRequestOptions.reset()
    fireDesignateDeviceRequest(handle, {
      rollbackScreen: SCREEN.ONBOARDING,
    })
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Text style={styles.welcomeText}>Welcome to</Text>
        <Text style={styles.braveText}>BRAVE</Text>
        <Text style={styles.alertText}>ALERT</Text>

        <View style={styles.cards}>
          <Cards>
            <ImageCard icon={faRunning} text="First time using Brave Alert? Swipe to learn more, or connect to the app right away." />
            <ImageCard icon={faExclamationCircle} text="Brave Alert will notify you if someone needs support." />
            <ImageCard
              icon={faCheckSquare}
              text="Brave Alert will also notify you of possible system errors or other need-to-knows (e.g. if the system loses internet connectivity or is running low on battery)."
            />
            <ContactBraveBoxesCard />
          </Cards>
        </View>

        <View style={styles.button}>
          <BasicButton
            onPress={handleButtonPress}
            backgroundColor={colors.primaryMedium}
            borderColor={colors.primaryMedium}
            fontColor={colors.greyscaleLightest}
            width={215}
          >
            Connect to App
          </BasicButton>
        </View>
      </SafeAreaView>
    </>
  )
}

export default OnboardingScreen
