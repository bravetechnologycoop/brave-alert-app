// Third-party dependencies
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPhoneRotary, faEnvelope } from '@fortawesome/pro-light-svg-icons'

// In-house dependencies
import InfoBox from '../InfoBox'
import colors from '../../resources/colors'

function ContactBraveBoxes(props) {
  return (
    <>
    <InfoBox faIcon={faPhoneRotary} drawBorder={true} color={colors.primaryMedium}>
      <Text style={styles.headerText}>Phone Brave</Text>
      <Text style={styles.bodyText}>+1 222 333 4444</Text>
    </InfoBox>
    <InfoBox faIcon={faEnvelope} drawBorder={true} color={colors.primaryMedium}>
      <Text style={styles.headerText}>Email Brave</Text>
      <Text style={styles.bodyText}>email@brave.coop</Text>
    </InfoBox>
    </>
  )
}

const styles = StyleSheet.create({
  headerText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    marginBottom: 5,
  },
  bodyText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
  },
})

export default ContactBraveBoxes
