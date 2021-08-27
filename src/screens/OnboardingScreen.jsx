// Third-party dependencies
import React, { useEffect, useState } from 'react'
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import { faCheckSquare, faExclamationCircle, faRunning } from '@fortawesome/pro-light-svg-icons'
import OneSignal from 'react-native-onesignal'
import { BUTTONS_BASE_URL /* , SENSOR_BASE_URL */ } from '@env'

// In-house dependencies
import { useSafeHandler } from '../hooks'
import AlertApiService from '../services/AlertApiService'
import SCREEN from '../navigation/ScreensEnum'
import BasicButton from '../components/BasicButton'
import Cards from '../components/Cards/Cards'
import ImageCard from '../components/Cards/ImageCard'
import { ContactBraveBoxesCard } from '../components/Cards'
import { ModalContainer, ModalView, VerificationCodeModal } from '../components/Modals'
import colors from '../resources/colors'
import Logger from '../services/Logger'

const logger = new Logger('OnboardingScreen')

const styles = StyleSheet.create({
  alertText: {
    color: colors.primaryMedium,
    fontFamily: 'Roboto-Black',
    fontSize: 20,
    textAlign: 'center',
    letterSpacing: 6,
  },
  braveText: {
    color: colors.primaryMedium,
    fontFamily: 'Roboto-Black',
    fontSize: 30,
    textAlign: 'center',
    letterSpacing: 7,
    marginBottom: 6,
  },
  button: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    backgroundColor: colors.greyscaleLightest,
    flex: 1,
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 0, // Do not take up any vertical space on the non-modal part of the screen
  },
  welcomeContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  welcomeText: {
    color: colors.greyscaleDark,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 6,
  },
})

function OnboardingScreen() {
  const [fireDesignateDeviceRequest, fireDesignateDeviceRequestOptions] = useSafeHandler()
  const [numVisibleModals, setNumVisibleModals] = useState(0)
  const [verificationCode, setVerificationCode] = useState('initial')

  function handleButtonPress() {
    function openModal() {
      setNumVisibleModals(1)
    }

    async function handle() {
      // Generate a 5-character random verification code (ref: https://gist.github.com/6174/6062387)
      const vCode = Math.random().toString(36).substring(2, 7).toUpperCase()
      setVerificationCode(vCode)

      // Retrieve OneSignal's player ID
      const oneSignalDeviceState = await OneSignal.getDeviceState()
      const oneSignalPlayerId = oneSignalDeviceState.userId

      // Log device ID and verification code
      const promises = [
        AlertApiService.designateDeviceRequest(BUTTONS_BASE_URL, vCode, oneSignalPlayerId),
        // TODO uncomment when change is also on Sensors
        // AlertApiService.designateDeviceRequest(SENSOR_BASE_URL, vCode, oneSignalPlayerId),
      ]
      await Promise.all(promises)

      openModal()
    }

    fireDesignateDeviceRequest(handle, {
      rollbackScreen: SCREEN.ONBOARDING,
    })
  }

  useEffect(() => {
    if (numVisibleModals === 0) {
      logger.debug('Re-enable the Connect To App button after the verification code modal is closed')
      fireDesignateDeviceRequestOptions.reset()
    }
  }, [numVisibleModals])

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.braveText}>BRAVE</Text>
          <Text style={styles.alertText}>ALERT</Text>
        </View>

        <View>
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

      <View style={styles.modalContainer}>
        <ModalContainer isModalVisible={numVisibleModals > 0}>
          <ModalView backgroundColor={colors.greyscaleLightest} hasCloseButton setNumVisibleModals={setNumVisibleModals}>
            <VerificationCodeModal verificationCode={`${verificationCode}`} setNumVisibleModals={setNumVisibleModals} />
          </ModalView>
        </ModalContainer>
      </View>
    </>
  )
}

export default OnboardingScreen
