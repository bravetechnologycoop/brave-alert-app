// Third-party dependencies
import React from 'react'
import { Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import { BUTTONS_BASE_URL, SENSOR_BASE_URL } from '@env'

// In-house dependencies
import { ALERT_TYPE } from '../constants'
import HistoricAlert from '../components/HistoricAlert'
import { getAlerts } from '../redux/selectors'
import { alertUrgentified } from '../redux/slices/alertsSlice'
import AlertApiService from '../services/AlertApiService'
import { useSafeHandler } from '../hooks'
import SCREEN from '../navigation/ScreensEnum'
import { startAlarm, stopAlarm } from '../services/SoundService'
import { safeReportError } from '../services/ErrorReportingService'
import Logger from '../services/Logger'

// Setup logger
const logger = new Logger('ExampleScreen2')

function ExampleScreen2() {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [fireFakeEndpoint, fireFakeEndpointOptions] = useSafeHandler()
  const [fireTestRequest, fireTestRequestOptions] = useSafeHandler()

  const alerts = useSelector(getAlerts)

  function renderAlert(alert, index) {
    const timestamp = new Date(alert.createdTimestamp)
    const timeString = `${timestamp.getHours().toString().padStart(2, '0')}:${timestamp.getMinutes().toString().padStart(2, '0')}`

    return (
      <HistoricAlert
        roomName={alert.location}
        time={timeString}
        category={alert.category}
        isUrgent={alert.alertType === ALERT_TYPE.BUTTONS_URGENT}
        key={index}
      />
    )
  }

  function handleCallFakeEndpoint() {
    async function handle() {
      await AlertApiService.fakeEndpointRequest(SENSOR_BASE_URL)
    }

    fireFakeEndpointOptions.reset()
    fireFakeEndpoint(handle, {
      rollbackScreen: SCREEN.EXAMPLE2,
    })
  }

  function handleCallTestApi() {
    async function handle() {
      const response = await AlertApiService.testRequest(BUTTONS_BASE_URL)
      logger.info(`*** testResponse *** ${JSON.stringify(response)}`)
    }

    fireTestRequestOptions.reset()
    fireTestRequest(handle, {
      rollbackScreen: SCREEN.EXAMPLE2,
    })
  }

  function handleStartAlarm() {
    try {
      startAlarm()
    } catch (err) {
      safeReportError(err)
    }
  }

  function handleStopAlarm() {
    try {
      stopAlarm()
    } catch (err) {
      safeReportError(err)
    }
  }

  return (
    <>
      <Button title="Go to OtherScreen" onPress={() => navigation.navigate(SCREEN.EXAMPLE)} />
      <HistoricAlert roomName="Example" time="10:00 AM" category="Overdose" isUrgent="false" />
      {alerts.map(renderAlert)}
      <Button title="Make Urgent" onPress={() => dispatch(alertUrgentified())} />
      <Button title="Call an API endpoint that doesn't exist" onPress={() => handleCallFakeEndpoint()} />
      <Button title="Call POST /alert/test" onPress={() => handleCallTestApi()} />
      <Button title="Start alarm" onPress={() => handleStartAlarm()} />
      <Button title="Stop alarm" onPress={() => handleStopAlarm()} />
    </>
  )
}

export default ExampleScreen2
