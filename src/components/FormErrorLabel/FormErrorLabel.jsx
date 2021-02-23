// Third-party dependencies
import React from 'react'
import { StyleSheet, Text } from 'react-native'

// In-house dependencies
import colors from '../../resources/colors'

const styles = StyleSheet.create({
  errorLabel: {
    color: colors.urgentActive,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    marginBottom: 15,
  },
})

function FormErrorLabel(props) {
  const { children } = props

  return <Text style={styles.errorLabel}>{children}</Text>
}

export default FormErrorLabel
