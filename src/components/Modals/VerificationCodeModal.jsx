// Third-party dependencies
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { BUTTONS_BASE_URL, SENSOR_BASE_URL } from '@env'

// In-house dependencies
import { useSafeHandler } from '../../hooks'
import { setIsButtonsLocation, setIsDemo, setIsSensorLocation, setLocationName } from '../../redux/slices/locationSlice'
import BasicButton from '../BasicButton'
import ContactBraveBoxes from '../ContactBraveBoxes'
import InlineStack from '../InlineStack'
import FormErrorLabel from '../FormErrorLabel'
import colors from '../../resources/colors'
import AlertApiService from '../../services/AlertApiService'
import SCREEN from '../../navigation/ScreensEnum'
import Logger from '../../services/Logger'

const logger = new Logger('VerificationCodeModal')

const styles = StyleSheet.create({
  connectNowContainer: {
    marginBottom: 10,
  },
  contactContainer: {
    height: 90,
    marginBottom: 35,
  },
  demoText: {
    color: colors.primaryDark,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 14,
    textDecorationLine: 'underline',
  },
  text: {
    color: colors.greyscaleDark,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 25,
  },
  verificationCodeBox: {
    borderColor: colors.greyscaleDark,
    borderWidth: 0.5,
    height: 37,
    width: 37,
  },
  verificationCodeContainer: {
    height: 37,
    marginBottom: 35,
    alignItems: 'center',
  },
  verificiationCodeText: {
    color: colors.greyscaleDarkest,
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 10,
  },
})

function VerificationCodeModal(props) {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const { verificationCode, setNumVisibleModals } = props
  const [fireGetLocationRequest, fireGetLocationRequestOptions] = useSafeHandler()
  const [isConnectionError, setIsConnectionError] = useState(false)

  useEffect(() => {
    if (isConnectionError) {
      logger.debug('Re-enable the Connect Now button after a connection error')
      fireGetLocationRequestOptions.reset()
    }
  }, [isConnectionError])

  function closeModal() {
    setNumVisibleModals(numVisibleModals => numVisibleModals - 1)
  }

  function handleConnectNow() {
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
        closeModal()
      } else {
        setIsConnectionError(true)
      }
    }

    // Clear any errors
    setIsConnectionError(false)

    fireGetLocationRequest(handle, {
      rollbackScreen: SCREEN.ONBOARDING,
    })
  }

  function handleTryDemo() {
    logger.info(`Open in demo mode`)
    dispatch(setLocationName('DEMO MODE'))
    dispatch(setIsButtonsLocation(true))
    dispatch(setIsSensorLocation(true))
    dispatch(setIsDemo(true))

    navigation.navigate(SCREEN.MAIN)

    closeModal()
  }

  return (
    <>
      <Text style={styles.text}>Reach out to Brave with the following verification code:</Text>
      <View style={styles.verificationCodeContainer}>
        <InlineStack gap={9}>
          {verificationCode.split('').map((character, index) => (
            /* eslint-disable-next-line react/no-array-index-key */
            <View style={styles.verificationCodeBox} key={index}>
              <Text style={styles.verificiationCodeText}>{character}</Text>
            </View>
          ))}
        </InlineStack>
      </View>
      <View style={styles.contactContainer}>
        <ContactBraveBoxes hideEmail />
      </View>
      <View style={styles.connectNowContainer}>
        <BasicButton
          backgroundColor={colors.primaryMedium}
          borderColor={colors.primaryMedium}
          fontColor={colors.greyscaleLightest}
          width={190}
          onPress={handleConnectNow}
        >
          <Text>Connect Now</Text>
        </BasicButton>
      </View>
      {isConnectionError && <FormErrorLabel>Sorry, your device could not connect. Please contact Brave.</FormErrorLabel>}
      <BasicButton
        backgroundColor={colors.greyscaleLightest}
        borderColor={colors.primaryMedium}
        fontColor={colors.primaryMedium}
        width={190}
        onPress={handleTryDemo}
      >
        <Text> ... or try the demo</Text>
      </BasicButton>
    </>
  )
}

export default VerificationCodeModal
