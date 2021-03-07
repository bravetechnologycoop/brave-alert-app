// Third-party dependencies
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { faInfoCircle } from '@fortawesome/pro-light-svg-icons'

// In-house dependencies
import ContactBraveBoxes from '../ContactBraveBoxes'
import InfoBox from '../InfoBox'
import colors from '../../resources/colors'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  contactBraveContainer: {
    height: 185,
    width: 300,
  },
  infoBoxContainer: {
    height: 90,
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
    marginBottom: 25,
  },
})

function ContactBraveBoxesCard() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Still have questions? We have answers.</Text>

      <View style={styles.infoBoxContainer}>
        <InfoBox drawBorder faIcon={faInfoCircle} color={colors.primaryMedium}>
          <Text style={styles.infoBoxHeaderText}>Learn more</Text>
          <Text style={styles.infoBoxText}>bravesensor.com/alertfaq</Text>
        </InfoBox>
      </View>

      <View style={styles.contactBraveContainer}>
        <ContactBraveBoxes />
      </View>
    </View>
  )
}

export default ContactBraveBoxesCard
