// Third-party dependencies
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Portal from '@burstware/react-native-portal'
import { isEmpty, map } from 'lodash'
import OneSignal from 'react-native-onesignal'
import { Alert } from 'react-native'
import { ONESIGNAL_APP_ID } from '@env'

// In-house dependencies
import { ModalView, ModalContainer, AlertModal } from '../Modals'
import { ALERT_TYPE, ALERT_STATUS } from '../../constants'
import colors from '../../resources/colors'
import { getAlerts } from '../../redux/selectors'
import { setAlerts } from '../../redux/slices/alertsSlice'
import Logger from '../../services/Logger'

const logger = new Logger('AlertManager')

function AlertManager() {
  const dispatch = useDispatch()

  const alerts = useSelector(getAlerts)

  const incidentTypes = ['Overdose', 'Unsafe Guest', 'Accidental', 'Mental Health', 'Other']

  // OneSignal Init Code
  OneSignal.setLogLevel(6, 0)
  OneSignal.setAppId(ONESIGNAL_APP_ID)

  // Prompt for push on iOS
  OneSignal.promptForPushNotificationsWithUserResponse(response => {
    logger.debug('Prompt response:', response)
  })

  // Method for handling notifications opened
  OneSignal.setNotificationOpenedHandler(notification => {
    logger.debug('OneSignal: notification opened:', notification)
  })

  // Method for handling notifications received while app in foreground
  OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
    const notification = notificationReceivedEvent.getNotification()
    logger.info('notification: ', notification)

    // TODO update global state, which will render the Alert(s)

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

    // Don't show the native notification
    notificationReceivedEvent.complete(null)
  })

  function renderAlert(alert) {
    const borderColor =
      alert.alertType === ALERT_TYPE.BUTTONS_NOT_URGENT || alert.alertType === ALERT_TYPE.SENSOR_DURATION
        ? colors.alertHistoric
        : colors.urgentHistoric

    const borderWidth = alert.alertStatus === ALERT_STATUS.REMINDING ? 6 : 0

    return (
      <ModalView backgroundColor={colors.greyscaleLightest} borderColor={borderColor} borderWidth={borderWidth} key={alert.id}>
        <AlertModal
          alertType={alert.alertType}
          deviceName={alert.location}
          alertStatus={alert.alertStatus}
          incidentTypes={alert.categories}
          key={alert.id}
        />
      </ModalView>
    )
  }
  return (
    <Portal>
      <ModalContainer isModalVisible={!isEmpty(alerts)}>{alerts.map(renderAlert)}</ModalContainer>
    </Portal>
  )
}

export default AlertManager
