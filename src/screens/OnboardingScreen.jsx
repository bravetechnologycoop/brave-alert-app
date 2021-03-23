// Third-party dependencies
import React, { useEffect, useState } from 'react'
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import { faCheckSquare, faExclamationCircle, faRunning } from '@fortawesome/pro-light-svg-icons'
import { BUTTONS_BASE_URL, SENSOR_BASE_URL } from '@env'

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

      // Log device ID and verification code
      const promises = [
        AlertApiService.designateDeviceRequest(BUTTONS_BASE_URL, vCode),
        AlertApiService.designateDeviceRequest(SENSOR_BASE_URL, vCode),
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

      <ModalContainer isModalVisible={numVisibleModals > 0}>
        <ModalView backgroundColor={colors.greyscaleLightest} hasCloseButton setNumVisibleModals={setNumVisibleModals}>
          <VerificationCodeModal verificationCode={`${verificationCode}`} setNumVisibleModals={setNumVisibleModals} />
        </ModalView>
      </ModalContainer>
    </>
  )
}

export default OnboardingScreen
