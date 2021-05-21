// Third-party dependencies
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

const iconSize = 50

const styles = StyleSheet.create({
  mainContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flexShrink: 1,
    flexGrow: 1,
    marginLeft: 20,
    fontSize: 14,
    lineHeight: 18,
  },
  iconContainer: {
    width: iconSize,
    height: iconSize,
    borderRadius: iconSize / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slashView: {
    width: iconSize - 2,
    height: 0,
    borderBottomWidth: 2,
    transform: [{ translateY: iconSize / 2 - 5 }, { rotateZ: '45deg' }],
  },
})

function InfoBoxMainContent(props) {
  const { faIcon, color, drawIconCircle, drawIconSlash, children } = props
  return (
    <View style={styles.mainContentContainer}>
      <View style={[styles.iconContainer, drawIconCircle ? { borderColor: color, borderWidth: 2 } : null]}>
        {drawIconSlash && <View style={[styles.slashView, { borderColor: color }]} />}
        <FontAwesomeIcon size={drawIconCircle ? iconSize - 16 : iconSize} icon={faIcon} color={color} />
      </View>
      <View style={styles.textContainer}>{children}</View>
    </View>
  )
}

export default InfoBoxMainContent
