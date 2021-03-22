// Third-party dependencies
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

// In-house dependencies
import colors from '../../resources/colors'

const iconSize = 50

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    height: 90,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: colors.greyscaleLightest,
  },
  textContainer: {
    flexShrink: 1,
    marginLeft: 20,
    marginRight: 20,
    fontSize: 14,
    lineHeight: 18,
  },
  iconContainer: {
    width: iconSize,
    height: iconSize,
    borderRadius: iconSize / 2,
    marginLeft: 25,
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

function InfoBox(props) {
  const { faIcon, color, drawBorder, drawIconCircle, drawIconSlash, children } = props
  return (
    <View style={[styles.container, drawBorder ? { borderColor: color, borderWidth: 2 } : null]}>
      <View style={[styles.iconContainer, drawIconCircle ? { borderColor: color, borderWidth: 2 } : null]}>
        {drawIconSlash && <View style={[styles.slashView, { borderColor: color }]} />}
        <FontAwesomeIcon size={drawIconCircle ? iconSize - 16 : iconSize} icon={faIcon} color={color} />
      </View>
      <View style={styles.textContainer}>{children}</View>
    </View>
  )
}

export default InfoBox
