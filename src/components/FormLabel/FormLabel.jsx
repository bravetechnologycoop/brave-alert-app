// Third-party dependencies
import React from 'react'
import { StyleSheet, Text } from 'react-native'

// In-house dependencies
import colors from '../../resources/colors'

const styles = StyleSheet.create({
  label: {
    color: colors.greyscaleDarker,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    marginBottom: 15,
  },
})

function FormLabel(props) {
  const { children } = props

  return (
    <>
      <Text style={styles.label}>{children}</Text>
    </>
  )
}

export default FormLabel
