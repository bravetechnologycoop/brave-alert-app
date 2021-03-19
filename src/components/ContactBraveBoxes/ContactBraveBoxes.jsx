// Third-party dependencies
import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { faPhoneRotary, faEnvelope } from '@fortawesome/pro-light-svg-icons'

// In-house dependencies
import InfoBox from '../InfoBox'
import colors from '../../resources/colors'

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

function ContactBraveBoxes() {
  return (
    <>
      <InfoBox drawBorder faIcon={faPhoneRotary} color={colors.primaryMedium}>
        <Text style={styles.headerText}>Phone Brave</Text>
        <Text style={styles.bodyText}>+1-833-833-2100</Text>
      </InfoBox>
      <InfoBox drawBorder faIcon={faEnvelope} color={colors.primaryMedium}>
        <Text style={styles.headerText}>Email Brave</Text>
        <Text style={styles.bodyText}>contact@brave.coop</Text>
      </InfoBox>
    </>
  )
}

export default ContactBraveBoxes
