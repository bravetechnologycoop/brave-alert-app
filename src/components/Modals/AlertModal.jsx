// Third-party dependencies
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { faBell, faExclamationCircle, faHourglassEnd, faRunning, faSensorOn } from '@fortawesome/pro-light-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { BUTTONS_BASE_URL /* , SENSOR_BASE_URL */ } from '@env'

// In-house dependencies
import AlertApiService from '../../services/AlertApiService'
import { useSafeHandler } from '../../hooks'
import colors from '../../resources/colors'
import BasicButton from '../BasicButton'
import { ALERT_TYPE, CHATBOT_STATE } from '../../constants'
import IncidentCategoryModal from './IncidentCategoryModal'
import { setAlerts } from '../../redux/slices/alertsSlice'
import Logger from '../../services/Logger'
import SCREEN from '../../navigation/ScreensEnum'

const logger = new Logger('AlertModal')

const iconSize = 50

const styles = StyleSheet.create({
  iconContainer: {
    width: iconSize,
    height: iconSize,
    borderRadius: iconSize / 2,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 15,
  },
  slashView: {
    width: iconSize - 2,
    height: 0,
    borderBottomWidth: 2,
    transform: [{ translateY: iconSize / 2 - 5 }, { rotateZ: '45deg' }],
  },
  titleText: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitleText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 19,
  },
  respondToText: {
    color: colors.greyscaleDark,
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 7,
  },
  deviceNameText: {
    color: colors.greyscaleDarkest,
    fontFamily: 'Roboto-Bold',
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 30,
  },
  instructionsText: {
    color: colors.greyscaleDarkest,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 25,
  },
  buttonView: {
    marginBottom: 28,
  },
  incidentTypesButtonView: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 25,
  },
})

function AlertModal(props) {
  const { chatbotState, alertType, deviceName, id, validIncidentCategories } = props

  const dispatch = useDispatch()

  const [fireAcknowledgeAlertSessionRequest, fireAcknowledgeAlertSessionRequestOptions] = useSafeHandler()
  const [fireRespondToAlertSessionRequest, fireRespondToAlertSessionRequestOptions] = useSafeHandler()

  function handleOnMyWay() {
    async function handle() {
      logger.debug(`Acknowledge alert for ${deviceName}`)

      const promises = [
        AlertApiService.acknowledgeAlertSessionRequest(BUTTONS_BASE_URL, id),
        /* AlertApiService.acknowledgeAlertSessionRequest(SENSOR_BASE_URL, id), */
      ]

      // TODO update when the Sensors backend is working
      const sensorsAlerts = []
      const [buttonsAlerts /* , sensorsAlerts */] = await Promise.all(promises)

      // Combine the results
      const alerts = buttonsAlerts.concat(sensorsAlerts)

      dispatch(setAlerts(alerts))

      fireAcknowledgeAlertSessionRequestOptions.reset()
    }

    fireAcknowledgeAlertSessionRequest(handle, { rollbackScreen: SCREEN.ALERT })
  }

  function handleCompleted() {
    async function handle() {
      logger.debug(`Respond to alert for ${deviceName}`)

      const promises = [
        AlertApiService.respondToAlertSessionRequest(BUTTONS_BASE_URL, id),
        /* AlertApiService.respondToAlertSessionRequest(SENSOR_BASE_URL, id), */
      ]

      // TODO update when the Sensors backend is working
      const sensorsAlerts = []
      const [buttonsAlerts /* , sensorsAlerts */] = await Promise.all(promises)

      // Combine the results
      const alerts = buttonsAlerts.concat(sensorsAlerts)

      dispatch(setAlerts(alerts))

      fireRespondToAlertSessionRequestOptions.reset()
    }

    fireRespondToAlertSessionRequest(handle, { rollbackScreen: SCREEN.ALERT })
  }

  let icon
  let color
  let drawIconCircle = false
  let drawIconSlash = false
  let title
  let subtitle
  let buttonColor
  if (alertType === ALERT_TYPE.BUTTONS_NOT_URGENT) {
    icon = faBell
    color = colors.alertHistoric
    drawIconCircle = true
    title = 'BUTTONS ALERT'
    subtitle = 'SAFETY'
    buttonColor = colors.alertHistoric
  } else if (alertType === ALERT_TYPE.BUTTONS_URGENT) {
    icon = faExclamationCircle
    color = colors.urgentHistoric
    title = 'BUTTONS ALERT'
    subtitle = 'URGENT'
    buttonColor = colors.urgentHistoric
  } else if (alertType === ALERT_TYPE.SENSOR_DURATION) {
    icon = faHourglassEnd
    color = colors.alertHistoric
    drawIconCircle = true
    title = 'SENSOR ALERT'
    subtitle = 'DURATION'
    buttonColor = colors.alertHistoric
  } else if (alertType === ALERT_TYPE.SENSOR_STILLNESS) {
    icon = faRunning
    color = colors.urgentHistoric
    drawIconCircle = true
    drawIconSlash = true
    title = 'SENSOR ALERT'
    subtitle = 'NO MOVEMENT'
    buttonColor = colors.urgentHistoric
  } else if (alertType === ALERT_TYPE.SENSOR_UNKNOWN) {
    icon = faSensorOn
    color = colors.urgentHistoric
    drawIconCircle = true
  }

  let respondToText
  let buttonLabel
  let buttonFunction
  if (chatbotState === CHATBOT_STATE.STARTED || chatbotState === CHATBOT_STATE.WAITING_FOR_REPLY) {
    respondToText = 'Respond to'
    buttonLabel = 'On my way!'
    buttonFunction = handleOnMyWay
  } else if (chatbotState === CHATBOT_STATE.RESPONDING) {
    respondToText = 'Now responding to'
    buttonLabel = 'Completed'
    buttonFunction = handleCompleted
  }

  return (
    <>
      {(chatbotState === CHATBOT_STATE.STARTED || chatbotState === CHATBOT_STATE.WAITING_FOR_REPLY || chatbotState === CHATBOT_STATE.RESPONDING) && (
        <>
          <View style={[styles.iconContainer, drawIconCircle ? { borderColor: color, borderWidth: 2 } : null]}>
            {drawIconSlash && <View style={[styles.slashView, { borderColor: color }]} />}
            <FontAwesomeIcon size={drawIconCircle ? iconSize - 16 : iconSize} icon={icon} color={color} />
          </View>
          <Text style={[styles.titleText, { color }]}>{title}</Text>
          <Text style={[styles.subtitleText, { color }]}>{subtitle}</Text>
          <Text style={styles.respondToText}>{respondToText}</Text>
          <Text style={styles.deviceNameText}>{deviceName}</Text>
          <View style={styles.buttonView}>
            <BasicButton
              backgroundColor={buttonColor}
              borderColor={buttonColor}
              fontColor={colors.greyscaleDarkest}
              width={140}
              onPress={buttonFunction}
            >
              {buttonLabel}
            </BasicButton>
          </View>
        </>
      )}
      {chatbotState === CHATBOT_STATE.WAITING_FOR_CATEGORY && (
        <IncidentCategoryModal deviceName={deviceName} validIncidentCategories={validIncidentCategories} id={id} />
      )}
    </>
  )
}

export default AlertModal
