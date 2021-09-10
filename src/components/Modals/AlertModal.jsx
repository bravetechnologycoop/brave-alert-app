// Third-party dependencies
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { StackActions, useNavigation } from '@react-navigation/native'
import { faBell, faExclamationCircle, faHourglassEnd, faRunning, faSensorOn } from '@fortawesome/pro-light-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { BUTTONS_BASE_URL /* , SENSOR_BASE_URL */ } from '@env'

// In-house dependencies
import AlertApiService from '../../services/AlertApiService'
import { useSafeHandler } from '../../hooks'
import colors from '../../resources/colors'
import BasicButton from '../BasicButton'
import { ALERT_STATUS, ALERT_TYPE } from '../../constants'
import IncidentCategoryModal from './IncidentCategoryModal'
import { setAlerts } from '../../redux/slices/alertsSlice'
import Logger from '../../services/Logger'

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
  const { alertStatus, alertType, deviceName, id, incidentTypes } = props

  const navigation = useNavigation()

  const [fireAcknowledgeAlertSessionRequest, fireAcknowledgeAlertSessionRequestOptions] = useSafeHandler()

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

  function handleOnMyWay() {
    async function handle() {
      logger.debug(`Acknowledge alert for ${deviceName}`)

      const promises = [
        AlertApiService.acknowledgeAlertSessionRequest(BUTTONS_BASE_URL, id),
        /* AlertApiService.acknowledgeAlertSessionRequest(SENSOR_BASE_URL, id), */
      ]

      // TODO update when the backend is working as expected
      const sensorsAlerts = []
      const buttonsAlerts = []
      /* const [buttonsAlerts , sensorsAlerts] = */ await Promise.all(promises)

      // Combine the results
      setAlerts(buttonsAlerts.concat(sensorsAlerts))

      // TODO close only this modal
      const popAction = StackActions.pop(1)
      navigation.dispatch(popAction)
    }

    fireAcknowledgeAlertSessionRequest(handle)

    fireAcknowledgeAlertSessionRequestOptions.reset()
  }

  function handleCompleted() {
    // TODO close only this modal
    const popAction = StackActions.pop(1)
    navigation.dispatch(popAction)
  }

  return (
    <>
      {(alertStatus === ALERT_STATUS.NEW || alertStatus === ALERT_STATUS.REMINDING) && (
        <>
          <View style={[styles.iconContainer, drawIconCircle ? { borderColor: color, borderWidth: 2 } : null]}>
            {drawIconSlash && <View style={[styles.slashView, { borderColor: color }]} />}
            <FontAwesomeIcon size={drawIconCircle ? iconSize - 16 : iconSize} icon={icon} color={color} />
          </View>
          <Text style={[styles.titleText, { color }]}>{title}</Text>
          <Text style={[styles.subtitleText, { color }]}>{subtitle}</Text>
          <Text style={styles.respondToText}>Respond to</Text>
          <Text style={styles.deviceNameText}>{deviceName}</Text>
          <View style={styles.buttonView}>
            <BasicButton
              backgroundColor={buttonColor}
              borderColor={buttonColor}
              fontColor={colors.greyscaleDarkest}
              width={140}
              onPress={handleOnMyWay}
            >
              On my way!
            </BasicButton>
          </View>
        </>
      )}
      {alertStatus === ALERT_STATUS.RESPONDING && (
        <>
          <View style={[styles.iconContainer, drawIconCircle ? { borderColor: color, borderWidth: 2 } : null]}>
            {drawIconSlash && <View style={[styles.slashView, { borderColor: color }]} />}
            <FontAwesomeIcon size={drawIconCircle ? iconSize - 16 : iconSize} icon={icon} color={color} />
          </View>
          <Text style={[styles.titleText, { color }]}>{title}</Text>
          <Text style={[styles.subtitleText, { color }]}>{subtitle}</Text>
          <Text style={styles.respondToText}>Now responding to</Text>
          <Text style={styles.deviceNameText}>{deviceName}</Text>
          <View style={styles.buttonView}>
            <BasicButton
              backgroundColor={buttonColor}
              borderColor={buttonColor}
              fontColor={colors.greyscaleDarkest}
              width={140}
              onPress={handleCompleted}
            >
              Completed
            </BasicButton>
          </View>
        </>
      )}
      {alertStatus === ALERT_STATUS.REPORTING && <IncidentCategoryModal deviceName={deviceName} incidentTypes={incidentTypes} id={id} />}
    </>
  )
}

export default AlertModal
