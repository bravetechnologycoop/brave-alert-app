// Third-party dependencies
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { faInfoCircle } from '@fortawesome/pro-light-svg-icons'

// In-house dependencies
import ContactBraveBoxes from '../ContactBraveBoxes'
import { InfoBox, InfoBoxMainContent } from '../InfoBox'
import colors from '../../resources/colors'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  contactBraveContainer: {
    minHeight: 200,
    width: 300,
  },
  infoBoxContainer: {
    minHeight: 100,
    width: 300,
  },
  infoBoxHeaderText: {
    color: colors.greyscaleDarker,
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    marginBottom: 5,
  },
  infoBoxText: {
    color: colors.greyscaleDark,
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
  },
  text: {
    color: colors.greyscaleDark,
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 15,
  },
})

function ContactBraveBoxesCard() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Still have questions? We have answers.</Text>

      <View style={styles.infoBoxContainer}>
        <InfoBox drawBorder color={colors.primaryMedium}>
          <InfoBoxMainContent faIcon={faInfoCircle} color={colors.primaryMedium}>
            <Text style={styles.infoBoxHeaderText}>Learn more</Text>
            <Text style={styles.infoBoxText}>bravesensor.com/alertfaq</Text>
          </InfoBoxMainContent>
        </InfoBox>
      </View>

      <View style={styles.contactBraveContainer}>
        <ContactBraveBoxes />
      </View>
    </View>
  )
}

export default ContactBraveBoxesCard
