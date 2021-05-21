// Third-party dependencies
import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, StatusBar, View } from 'react-native'

// In-house dependencies
import { ALERT_TYPE, ALERT_STATUS } from '../constants'
import HistoricAlert from '../components/HistoricAlert'
import { useSafeHandler } from '../hooks'
import SCREEN from '../navigation/ScreensEnum'
import { formatTimeString } from '../helpers'
import colors from '../resources/colors'

const styles = StyleSheet.create({
  infoBoxContainer: {
    borderRadius: 10,
    width: '90%',
    paddingHorizontal: 10,
    marginLeft: '5%',
    marginTop: 10,
    marginBottom: 10,
  },
  scrollView: {
    backgroundColor: colors.greyscaleLighter,
  },
})

function AlertHistoryScreen() {
  const [fireGetHistoricAlertsRequest] = useSafeHandler()
  const [alerts, setAlerts] = useState([])

  useEffect(() => {
    setAlerts([
      {
        id: 'abc-123-guid-1',
        alertStatus: ALERT_STATUS.RESPONDING,
        location: 'Room 101',
        category: 'Accidental',
        alertType: ALERT_TYPE.BUTTONS_NOT_URGENT,
        numButtonPresses: 2,
        createdTimestamp: '2020-10-10T16:00:00.000Z',
        respondedTimestamp: '2020-10-10T16:01:45.000Z',
      },
      {
        id: 'abc-123-guid-2',
        alertStatus: ALERT_STATUS.RESPONDING,
        location: 'Room 101',
        category: 'Mental Health Alert Long Name',
        alertType: ALERT_TYPE.BUTTONS_URGENT,
        numButtonPresses: 2,
        createdTimestamp: '2020-10-10T16:00:00.000Z',
        respondedTimestamp: '2020-10-11T16:01:45.000Z',
      },
      {
        id: 'abc-123-guid-3',
        alertStatus: ALERT_STATUS.RESPONDING,
        location: 'Room 101',
        category: 'Accidental',
        alertType: ALERT_TYPE.SENSOR_DURATION,
        createdTimestamp: '2020-10-10T16:00:00.000Z',
      },
      {
        id: 'abc-123-guid-4',
        alertStatus: ALERT_STATUS.RESPONDING,
        location: 'Fourteenth Floor Second Women Washroom',
        alertType: ALERT_TYPE.SENSOR_NO_MOTION,
        createdTimestamp: '2020-10-10T16:00:00.000Z',
        respondedTimestamp: '2020-10-10T16:01:45.000Z',
      },
    ])

    async function handle() {
      // TODO On page load, call the APIs to get the Alert History instead of using the hardcoded `alerts`
    }
    fireGetHistoricAlertsRequest(handle, {
      rollbackScreen: SCREEN.HOME,
    })
  }, [])

  function formatRespondedTimeString(createdTimestamp, respondedTimestamp) {
    if (!respondedTimestamp) {
      return 'No response'
    }

    const createdTime = new Date(createdTimestamp)
    const respondedTime = new Date(respondedTimestamp)
    const formattedRespondedTime = formatTimeString(respondedTimestamp)

    // If it was responded to on the same date, in local time
    if (
      createdTime.getFullYear() === respondedTime.getFullYear() &&
      createdTime.getMonth() === respondedTime.getMonth() &&
      createdTime.getDate() === respondedTime.getDate()
    ) {
      return formattedRespondedTime
    }

    return `${respondedTime.toLocaleDateString()} ${formattedRespondedTime}`
  }

  function renderAlert(alert) {
    const alertTimeString = formatTimeString(alert.createdTimestamp)
    const responseTimeString = formatRespondedTimeString(alert.createdTimestamp, alert.respondedTimestamp)

    return (
      <HistoricAlert
        alertType={alert.alertType}
        roomName={alert.location}
        alertTime={alertTimeString}
        responseTime={responseTimeString}
        category={alert.category}
        numButtonPresses={alert.numButtonPresses}
        key={alert.id}
      />
    )
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
          <View style={styles.infoBoxContainer}>{alerts.map(renderAlert)}</View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

export default AlertHistoryScreen
