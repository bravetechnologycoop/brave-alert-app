// Third-party dependencies
import React from 'react'
import { StyleSheet, View } from 'react-native'

// In-house dependencies
import colors from '../../resources/colors'

const styles = StyleSheet.create({
  border: {
    borderWidth: 0.21,
    borderColor: colors.greyscaleDarkest,
    borderStyle: 'dashed',
    borderRadius: 1, // Required for the borderStyle to work in Android
    marginBottom: 15,
    marginTop: 15,
  },
})

function InfoBoxExpandedContent(props) {
  const { children } = props
  return (
    <>
      <View style={styles.border} />
      {children}
    </>
  )
}

export default InfoBoxExpandedContent
