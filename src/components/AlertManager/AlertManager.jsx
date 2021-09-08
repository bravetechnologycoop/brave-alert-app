// Third-party dependencies
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Portal from '@burstware/react-native-portal'
import { isEmpty } from 'lodash'
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
          alertStatus: ALERT_STATUS.RESPONDING,
          location: 'Room 302',
          category: 'Accidental',
          alertType: ALERT_TYPE.BUTTONS_NOT_URGENT,
          numButtonPresses: 2,
          createdTimestamp: 1602327600000, // 2020-10-10 04:00:00
          respondedTimestamp: 1602327630000, // 2020-10-10T04:00:30
          fallbackTimestamp: 1602327840000, // 2020-10-10T04:04:00
          categories: ['Safer Use', 'Overdose', 'Mental Health', 'Other'],
        },
      ]),
    )
    Alert.alert('Alert', notification.body)

    // Don't show the native notification
    notificationReceivedEvent.complete(null)
  })
  return (
    <Portal>
      {!isEmpty(alerts) && (
        <ModalContainer isModalVisible>
          <ModalView backgroundColor={colors.greyscaleLightest}>
            <AlertModal
              alertType={ALERT_TYPE.BUTTONS_NOT_URGENT}
              deviceName="Room 211"
              alertStatus={ALERT_STATUS.NEW}
              incidentTypes={incidentTypes}
            />
          </ModalView>
          <ModalView backgroundColor={colors.greyscaleLightest}>
            <AlertModal
              alertType={ALERT_TYPE.BUTTONS_URGENT}
              deviceName="Room 211"
              alertStatus={ALERT_STATUS.REMINDING}
              incidentTypes={incidentTypes}
            />
          </ModalView>
          <ModalView backgroundColor={colors.greyscaleLightest}>
            <AlertModal
              alertType={ALERT_TYPE.SENSOR_DURATION}
              deviceName="Room 211"
              alertStatus={ALERT_STATUS.RESPONDING}
              incidentTypes={incidentTypes}
            />
          </ModalView>
          <ModalView backgroundColor={colors.greyscaleLightest}>
            <AlertModal
              alertType={ALERT_TYPE.SENSOR_STILLNESS}
              deviceName="Room 211"
              alertStatus={ALERT_STATUS.REPORTING}
              incidentTypes={incidentTypes}
            />
          </ModalView>
        </ModalContainer>
      )}
    </Portal>
  )
}

export default AlertManager
