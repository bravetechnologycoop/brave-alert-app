// Third-party dependencies
import React, { useState } from 'react'
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBell, faChevronDown, faChevronUp, faExclamationCircle, faHourglassEnd, faRunning } from '@fortawesome/pro-light-svg-icons'

// In-house dependencies
import { InfoBox, InfoBoxMainContent, InfoBoxExpandedContent } from '../InfoBox'
import colors from '../../resources/colors'
import { ALERT_TYPE } from '../../constants'

const styles = StyleSheet.create({
  mainContentContainer: {
    flexDirection: 'column',
  },
  horizontalText: {
    flexDirection: 'row',
  },
  room: {
    flexDirection: 'row',
  },
  textCategory: {
    flexShrink: 1,
    color: colors.greyscaleDark,
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
  },
  textSeparator: {
    paddingHorizontal: 5,
    color: colors.greyscaleDark,
    fontSize: 16,
  },
  textStartTime: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
  },
  textRoom: {
    flexGrow: 1,
    flexShrink: 1,
    fontSize: 24,
    color: colors.greyscaleDarkest,
    fontFamily: 'Roboto-Regular',
  },
  textExpandedTitle: {
    color: colors.greyscaleDark,
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
  },
  textExpandedValue: {
    color: colors.greyscaleDark,
    fontSize: 14,
    fontFamily: 'Roboto-Bold',
  },
})

function HistoricAlert(props) {
  const { alertType, roomName, alertTime, category, responseTime, numButtonPresses } = props
  const [isExpanded, setIsExpanded] = useState(false)
  const [expandedHeight] = useState(new Animated.Value(0))
  const [expandedOpacity] = useState(new Animated.Value(0))

  let icon
  let color
  let drawIconCircle = false
  let drawIconSlash = false
  if (alertType === ALERT_TYPE.BUTTONS_NOT_URGENT) {
    icon = faBell
    color = colors.alertHistoric
    drawIconCircle = true
  } else if (alertType === ALERT_TYPE.BUTTONS_URGENT) {
    icon = faExclamationCircle
    color = colors.urgentHistoric
  } else if (alertType === ALERT_TYPE.SENSOR_DURATION) {
    icon = faHourglassEnd
    color = colors.alertHistoric
    drawIconCircle = true
  } else if (alertType === ALERT_TYPE.SENSOR_NO_MOTION) {
    icon = faRunning
    color = colors.urgentHistoric
    drawIconCircle = true
    drawIconSlash = true
  }

  // Expansion animation from https://stackoverflow.com/questions/45633818/how-do-you-animate-the-height-in-react-native-when-you-dont-know-the-size-of-th#answer-64797961
  const maxHeight = expandedHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100], // value larger than your content's height
  })

  function onPress() {
    Animated.parallel([
      Animated.timing(expandedHeight, {
        toValue: isExpanded ? 0 : 1,
        duration: 250,
        useNativeDriver: false, // need to set false to prevent yellow box warning
      }),
      Animated.timing(expandedOpacity, {
        toValue: isExpanded ? 0 : 1,
        duration: 250,
        useNativeDriver: false,
      }),
    ]).start()

    setIsExpanded(flag => !flag)
  }

  return (
    <Pressable onPress={onPress}>
      <InfoBox>
        <InfoBoxMainContent faIcon={icon} color={color} drawIconCircle={drawIconCircle} drawIconSlash={drawIconSlash}>
          <View style={styles.mainContentContainer}>
            <View style={styles.horizontalText}>
              <Text style={styles.textCategory}>{category}</Text>
              {category && <Text style={styles.textSeparator}>|</Text>}
              <Text style={[styles.textStartTime, { color }]}>{alertTime}</Text>
            </View>
            <View style={styles.room}>
              <Text style={styles.textRoom}>{roomName}</Text>
              <FontAwesomeIcon icon={isExpanded ? faChevronUp : faChevronDown} size={20} />
            </View>
          </View>
        </InfoBoxMainContent>
        <Animated.View style={{ maxHeight, opacity: expandedOpacity }}>
          <InfoBoxExpandedContent>
            <View style={styles.horizontalText}>
              <Text style={styles.textExpandedTitle}>Alert Response: </Text>
              <Text style={styles.textExpandedValue}>{responseTime}</Text>
            </View>
            {numButtonPresses && (
              <View style={styles.horizontalText}>
                <Text style={styles.textExpandedTitle}>Button Presses: </Text>
                <Text style={styles.textExpandedValue}>{numButtonPresses}</Text>
              </View>
            )}
          </InfoBoxExpandedContent>
        </Animated.View>
      </InfoBox>
    </Pressable>
  )
}

export default HistoricAlert
