// Third-party dependencies
import React, { useCallback, useState } from 'react'
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, StatusBar, Text, View } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { BUTTONS_BASE_URL, SENSOR_BASE_URL } from '@env'

// In-house dependencies
import HistoricAlert from '../components/HistoricAlert'
import AlertApiService from '../services/AlertApiService'
import PageHeader from '../components/PageHeader'
import { useSafeHandler } from '../hooks'
import SCREEN from '../navigation/ScreensEnum'
import { formatTimeString, isSameYearMonthDate } from '../helpers'
import colors from '../resources/colors'
import Logger from '../services/Logger'

const logger = new Logger('AlertHistoryScreen')

const numHistoricAlertsToDisplay = 20

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dateText: {
    color: colors.greyscaleDarker,
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    marginBottom: 15,
  },
  scrollView: {
    backgroundColor: colors.greyscaleLighter,
    marginHorizontal: '5%',
  },
  spinnerContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
})

function AlertHistoryScreen() {
  const [fireGetHistoricAlertsRequest, fireGetHistoricAlertsRequestOptions] = useSafeHandler()
  const [alerts, setAlerts] = useState(null)

  // Runs every time we navigate this this page
  useFocusEffect(
    useCallback(() => {
      async function handle() {
        logger.debug('Try to get the historic alerts from both Buttons and Sensors')
        const promises = [
          AlertApiService.getHistoricAlerts(BUTTONS_BASE_URL, numHistoricAlertsToDisplay),
          AlertApiService.getHistoricAlerts(SENSOR_BASE_URL, numHistoricAlertsToDisplay),
        ]
        const [buttonsHistoricAlerts, sensorsHistoricAlerts] = await Promise.all(promises)

        // Combine the results
        const historicAlerts = buttonsHistoricAlerts.concat(sensorsHistoricAlerts)

        // Sort by createdTimestamp and only keep the first numHistoricAlertsToDisplay of them
        const sortedHistoricAlerts = historicAlerts
          .sort((alert1, alert2) => alert1.createdTimestamp < alert2.createdTimestamp)
          .slice(0, numHistoricAlertsToDisplay)

        setAlerts(sortedHistoricAlerts)
      }

      fireGetHistoricAlertsRequest(handle, {
        rollbackScreen: SCREEN.HOME,
      })

      fireGetHistoricAlertsRequestOptions.reset()
    }, []),
  )

  function formatRespondedTimeString(createdTimestamp, respondedTimestamp) {
    if (!respondedTimestamp) {
      return 'No response'
    }

    const formattedRespondedTime = formatTimeString(respondedTimestamp)

    // If it was responded to on the same date, in local time
    if (isSameYearMonthDate(createdTimestamp, respondedTimestamp)) {
      return formattedRespondedTime
    }

    const respondedTime = new Date(respondedTimestamp)
    return `${respondedTime.toLocaleDateString()} ${formattedRespondedTime}`
  }

  function renderAlert(alert, index, array) {
    const alertTimeString = formatTimeString(alert.createdTimestamp)
    const responseTimeString = formatRespondedTimeString(alert.createdTimestamp, alert.respondedTimestamp)

    // If it's the first Historic Alert or if it has a different local date than the previous Historic Alert, then display the date string
    let dateString = null
    if (index === 0 || !isSameYearMonthDate(alert.createdTimestamp, array[index - 1].createdTimestamp)) {
      if (isSameYearMonthDate(alert.createdTimestamp, new Date())) {
        dateString = 'Today'
      } else {
        dateString = new Date(alert.createdTimestamp).toLocaleDateString()
      }
    }

    return (
      <View key={alert.id}>
        {dateString && <Text style={styles.dateText}>{dateString}</Text>}
        <HistoricAlert
          alertType={alert.alertType}
          deviceName={alert.deviceName}
          alertTime={alertTimeString}
          responseTime={responseTimeString}
          category={alert.category}
          numButtonPresses={alert.numButtonPresses}
        />
      </View>
    )
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        {fireGetHistoricAlertsRequestOptions.isFiring && (
          <>
            <PageHeader>Alert History</PageHeader>
            <View style={styles.spinnerContainer}>
              <ActivityIndicator size="large" color={colors.primaryMedium} />
            </View>
          </>
        )}
        {!fireGetHistoricAlertsRequestOptions.isFiring && (
          <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
            <PageHeader>Alert History</PageHeader>
            {alerts && alerts.length === 0 && <Text style={styles.dateText}>No historic alerts.</Text>}
            {alerts && alerts.map(renderAlert)}
          </ScrollView>
        )}
      </SafeAreaView>
    </>
  )
}

export default AlertHistoryScreen
