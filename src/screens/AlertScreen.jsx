// Third-party dependencies
import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { isEmpty } from 'lodash'

// In-house dependencies
import colors from '../resources/colors'
import { getAlerts } from '../redux/selectors'
import { AlertModal, ModalView } from '../components/Modals'
import { ALERT_TYPE, CHATBOT_STATE } from '../constants'

const styles = StyleSheet.create({
  centeredBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.greyscaleTransparent,
  },
})

function AlertScreen() {
  const navigation = useNavigation()
  const alerts = useSelector(getAlerts)

  // Runs every time we navigate this this page
  useFocusEffect(
    useCallback(() => {
      if (isEmpty(alerts)) {
        navigation.goBack()
      }
    }, []),
  )

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

  return (
    <ScrollView style={{ flex: 1, width: '100%' }} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.centeredBackground}>{alerts.map(renderAlert)}</View>
    </ScrollView>
  )
}

export default AlertScreen
