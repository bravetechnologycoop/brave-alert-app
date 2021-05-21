// Third-party dependencies
import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { faPhoneRotary, faEnvelope } from '@fortawesome/pro-light-svg-icons'

// In-house dependencies
import { InfoBox, InfoBoxMainContent } from '../InfoBox'
import colors from '../../resources/colors'

const styles = StyleSheet.create({
  headerText: {
    color: colors.greyscaleDarker,
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    marginBottom: 5,
  },
  bodyText: {
    color: colors.greyscaleDark,
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
  },
})

function ContactBraveBoxes(props) {
  const { hideEmail } = props
  return (
    <>
      <InfoBox drawBorder color={colors.primaryMedium}>
        <InfoBoxMainContent faIcon={faPhoneRotary} color={colors.primaryMedium}>
          <Text style={styles.headerText}>Phone Brave</Text>
          <Text style={styles.bodyText}>+1-833-833-2100</Text>
        </InfoBoxMainContent>
      </InfoBox>
      {!hideEmail && (
        <InfoBox drawBorder color={colors.primaryMedium}>
          <InfoBoxMainContent faIcon={faEnvelope} color={colors.primaryMedium}>
            <Text style={styles.headerText}>Email Brave</Text>
            <Text style={styles.bodyText}>contact@brave.coop</Text>
          </InfoBoxMainContent>
        </InfoBox>
      )}
    </>
  )
}

export default ContactBraveBoxes
