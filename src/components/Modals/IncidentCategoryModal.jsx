// Third-party dependencies
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { StyleSheet, Text, View } from 'react-native'
import { StackActions, useNavigation } from '@react-navigation/native'
import { BUTTONS_BASE_URL, SENSOR_BASE_URL } from '@env'

// In-house dependencies
import { useSafeHandler } from '../../hooks'
import colors from '../../resources/colors'
import BasicButton from '../BasicButton'
import AlertApiService from '../../services/AlertApiService'
import Logger from '../../services/Logger'
import { setAlerts } from '../../redux/slices/alertsSlice'
import SCREEN from '../../navigation/ScreensEnum'
import { ALERT_TYPE } from '../../constants'

const logger = new Logger('IncidentCategoryModal')

const styles = StyleSheet.create({
  titleText: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 5,
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
  incidentCategoryButtonView: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 25,
  },
})

function IncidentCategoryModal(props) {
  const { deviceName, validIncidentCategories, id, alertType } = props

  const navigation = useNavigation()
  const dispatch = useDispatch()

  const [fireSetIncidentCategoryRequest, fireSetIncidentCategoryRequestOptions] = useSafeHandler()
  const [selected, setSelected] = useState()

  function handleDone() {
    async function handle() {
      logger.debug(`Submit incidentCategory ${selected} for ${deviceName}`)

      let setIncidentCategoryBaseUrl
      let getActiveAlertsBaseUrl
      if (alertType === ALERT_TYPE.BUTTONS_NOT_URGENT || alertType === ALERT_TYPE.BUTTONS_URGENT) {
        setIncidentCategoryBaseUrl = BUTTONS_BASE_URL
        getActiveAlertsBaseUrl = SENSOR_BASE_URL
      } else {
        setIncidentCategoryBaseUrl = SENSOR_BASE_URL
        getActiveAlertsBaseUrl = BUTTONS_BASE_URL
      }

      const promises = [
        AlertApiService.setIncidentCategoryRequest(setIncidentCategoryBaseUrl, id, selected),
        AlertApiService.getActiveAlerts(getActiveAlertsBaseUrl),
      ]

      const [buttonsAlerts, sensorsAlerts] = await Promise.all(promises)

      // Combine and sort the results
      const activeAlerts = buttonsAlerts.concat(sensorsAlerts).sort((alert1, alert2) => alert1.createdAt > alert2.createdAt)

      dispatch(setAlerts(activeAlerts))

      fireSetIncidentCategoryRequestOptions.reset()

      if (activeAlerts.length === 0) {
        // Navigate away from the AlertScreen
        const popAction = StackActions.pop(1)
        navigation.dispatch(popAction)
      }
    }

    fireSetIncidentCategoryRequest(handle, { rollbackScreen: SCREEN.ALERT })
  }

  return (
    <>
      <Text style={[styles.titleText, { color: colors.primaryMedium }]}>INCIDENT REPORT</Text>
      <Text style={styles.respondToText}>You responded to:</Text>
      <Text style={styles.deviceNameText}>{deviceName}</Text>
      <Text style={styles.instructionsText}>Choose the option which best describes the incident:</Text>
      <View style={styles.incidentCategoryButtonView}>
        {validIncidentCategories.map(incidentType => (
          <BasicButton
            backgroundColor={selected === incidentType ? colors.greyscaleLightest : colors.primaryMedium}
            borderColor={colors.primaryMedium}
            fontColor={selected === incidentType ? colors.primaryMedium : colors.greyscaleLightest}
            width={125}
            margin={3}
            onPress={() => setSelected(incidentType)}
            key={incidentType}
          >
            {incidentType}
          </BasicButton>
        ))}
      </View>
      <View style={styles.buttonView}>
        {selected !== undefined && (
          <BasicButton
            backgroundColor={colors.greyscaleLightest}
            borderColor={colors.primaryMedium}
            fontColor={colors.primaryMedium}
            width={140}
            onPress={handleDone}
            disabled={selected === undefined}
          >
            Done
          </BasicButton>
        )}
        {selected === undefined && <View style={{ height: 45 }} />}
      </View>
    </>
  )
}

export default IncidentCategoryModal
