// Third-party dependencies
import React from 'react'
import { useSelector } from 'react-redux'
import Portal from '@burstware/react-native-portal'
import { isEmpty } from 'lodash'

// In-house dependencies
import { ModalView, ModalContainer, AlertModal } from '../Modals'
import { ALERT_TYPE, ALERT_STATUS } from '../../constants'
import colors from '../../resources/colors'
import { getAlerts } from '../../redux/selectors'

function AlertManager() {
  const alerts = useSelector(getAlerts)

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
