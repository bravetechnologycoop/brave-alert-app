// Third-party dependencies
import React from 'react'
import { useSelector } from 'react-redux'
import { isEmpty } from 'lodash'

// In-house dependencies
import { AlertModal, ModalView, ModalContainer } from '../Modals'
import { ALERT_TYPE, CHATBOT_STATE } from '../../constants'
import colors from '../../resources/colors'
import { getAlerts } from '../../redux/selectors'

function AlertManager() {
  const alerts = useSelector(getAlerts)

  function renderAlert(alert) {
    const borderColor =
      alert.alertType === ALERT_TYPE.BUTTONS_NOT_URGENT || alert.alertType === ALERT_TYPE.SENSOR_DURATION
        ? colors.alertHistoric
        : colors.urgentHistoric

    const borderWidth = alert.chatbotState === CHATBOT_STATE.WAITING_FOR_REPLY ? 6 : 0

    return (
      <ModalView backgroundColor={colors.greyscaleLightest} borderColor={borderColor} borderWidth={borderWidth} key={alert.id}>
        <AlertModal
          id={alert.id}
          alertType={alert.alertType}
          deviceName={alert.deviceName}
          chatbotState={alert.chatbotState}
          validIncidentCategories={alert.validIncidentCategories}
          key={alert.id}
        />
      </ModalView>
    )
  }

  return <ModalContainer isModalVisible={!isEmpty(alerts)}>{alerts.map(renderAlert)}</ModalContainer>
}

export default AlertManager
