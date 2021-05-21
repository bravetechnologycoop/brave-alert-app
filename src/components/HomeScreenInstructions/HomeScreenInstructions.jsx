// Third-party dependencies
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { faSensorOn, faHourglassEnd, faRunning, faBell, faExclamationCircle, faClipboardList, faHandPointer } from '@fortawesome/pro-light-svg-icons'

// In-house dependencies
import colors from '../../resources/colors'
import { InfoBox, InfoBoxMainContent } from '../InfoBox'
import ContactBraveBoxes from '../ContactBraveBoxes'

const styles = StyleSheet.create({
  infoBoxContainer: {
    backgroundColor: colors.greyscaleLighter,
    borderRadius: 10,
    width: '90%',
    paddingHorizontal: 10,
    marginLeft: '5%',
    marginTop: 10,
    marginBottom: 10,
  },
  questionsIntroText: {
    width: '90%',
    marginLeft: '6%',
    marginTop: 20,
    marginBottom: 15,
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    letterSpacing: 1,
    color: colors.primaryDark,
  },
  infoBoxBodyText: {
    fontSize: 14,
    lineHeight: 18,
    fontFamily: 'Roboto-Regular',
  },
  infoBoxBodyTextBold: {
    fontFamily: 'Roboto-Bold',
  },
  contactBraveText: {
    marginTop: 20,
    marginBottom: 15,
    width: '90%',
    marginLeft: '6%',
    fontSize: 16,
    fontStyle: 'normal',
    fontFamily: 'Roboto-Medium',
    letterSpacing: 1,
  },
})

function HomeScreenInstructions(props) {
  const { renderButtonsInstructions, renderSensorsInstructions } = props

  function Bold(boldProps) {
    const { children } = boldProps
    return <Text style={styles.infoBoxBodyTextBold}>{children}</Text>
  }

  return (
    <>
      <View style={styles.infoBoxContainer}>
        <Text style={styles.questionsIntroText}>Questions? Learn more:</Text>
        {renderButtonsInstructions && (
          <>
            <InfoBox>
              <InfoBoxMainContent faIcon={faHandPointer} color={colors.primaryMedium}>
                <Text style={styles.infoBoxBodyText}>When a resident presses their Brave button you will receive an alert.</Text>
              </InfoBoxMainContent>
            </InfoBox>
            <InfoBox>
              <InfoBoxMainContent faIcon={faBell} color={colors.alertActive} drawIconCircle>
                <Text style={styles.infoBoxBodyText}>
                  When a button is pressed only one time it is a <Bold>Safety Alert.</Bold>
                </Text>
              </InfoBoxMainContent>
            </InfoBox>
            <InfoBox>
              <InfoBoxMainContent faIcon={faExclamationCircle} color={colors.urgentActive}>
                <Text style={styles.infoBoxBodyText}>
                  When a button is pressed two or more times it is an <Bold>Urgent Alert.</Bold>
                </Text>
              </InfoBoxMainContent>
            </InfoBox>
          </>
        )}
        {renderSensorsInstructions && (
          <>
            <InfoBox>
              <InfoBoxMainContent faIcon={faSensorOn} color={colors.primaryMedium}>
                <Text style={styles.infoBoxBodyText}>Brave Sensors detect their surroundings and send alerts.</Text>
              </InfoBoxMainContent>
            </InfoBox>
            <InfoBox>
              <InfoBoxMainContent faIcon={faRunning} color={colors.urgentActive} drawIconCircle drawIconSlash>
                <Text style={styles.infoBoxBodyText}>
                  Brave Sensors send this alert when there is <Bold>no movement</Bold> in the space.
                </Text>
              </InfoBoxMainContent>
            </InfoBox>
            <InfoBox>
              <InfoBoxMainContent faIcon={faHourglassEnd} color={colors.alertActive} drawIconCircle>
                <Text style={styles.infoBoxBodyText}>Brave Sensors send this alert when the space has been occupied for a long time.</Text>
              </InfoBoxMainContent>
            </InfoBox>
          </>
        )}
        <InfoBox>
          <InfoBoxMainContent faIcon={faClipboardList} color={colors.primaryMedium}>
            <Text style={styles.infoBoxBodyText}>After responding, you will categorize the event in an Incident Report.</Text>
          </InfoBoxMainContent>
        </InfoBox>
        <Text style={styles.contactBraveText}>More questions? Contact Brave:</Text>
        <ContactBraveBoxes />
      </View>
    </>
  )
}

export default HomeScreenInstructions
