// Third-party dependencies
import React from 'react'
import { StyleSheet, View } from 'react-native'

// In-house dependencies
import colors from '../../resources/colors'

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    flex: 1,
    backgroundColor: colors.greyscaleLightest,
    padding: 15,
    marginBottom: 15,
  },
})

function InfoBox(props) {
  const { color, drawBorder, children } = props
  return (
    <>
      <View style={[styles.container, drawBorder ? { borderColor: color, borderWidth: 2 } : null]}>{children}</View>
    </>
  )
}

export default InfoBox
