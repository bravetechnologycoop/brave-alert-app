// Third-party dependencies
import React from 'react'
import { StyleSheet, View, Text, Pressable } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronRight } from '@fortawesome/pro-solid-svg-icons'

// In-house dependencies
import colors from '../../resources/colors'

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
    marginLeft: '5%',
    borderWidth: 2,
    borderColor: colors.primaryLight,
    borderRadius: 10,
    backgroundColor: colors.greyscaleLightest,
    padding: 15,
    marginBottom: 15,
    marginTop: 20,
  },
  textContainer: {
    flexShrink: 1,
    flexGrow: 1,
    marginLeft: 10,
  },
  iconContainer: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
  bodyText: {
    fontFamily: 'Roboto-Regular',
  },
  boldText: {
    fontFamily: 'Roboto-Bold',
  },
})

function HomeScreenNotificationsButton(props) {
  const { newNotificationsCount, onPress } = props

  function BoldText(boldProps) {
    const { children } = boldProps
    return <Text style={styles.boldText}>{children}</Text>
  }

  return (
    <Pressable onPress={onPress}>
      <View style={styles.mainContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.bodyText}>
            You have <BoldText>{newNotificationsCount}</BoldText> new notifications from Brave.
          </Text>
        </View>
        <View style={styles.iconContainer}>
          <FontAwesomeIcon size={15} icon={faChevronRight} color={colors.greyscaleLight} />
        </View>
      </View>
    </Pressable>
  )
}

export default HomeScreenNotificationsButton
