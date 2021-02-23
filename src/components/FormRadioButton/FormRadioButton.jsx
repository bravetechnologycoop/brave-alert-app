// Third-party dependencies
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

// In-house dependencies
import colors from '../../resources/colors'

const styles = StyleSheet.create({
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 25,
    marginBottom: 15,
  },
  radioButtonOutline: {
    height: 34,
    width: 34,
    backgroundColor: colors.greyscaleLightest,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: colors.greyscaleDarkest,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelectedIndicator: {
    height: 26,
    width: 26,
    borderRadius: 13,
    backgroundColor: colors.primaryMedium,
  },
  radioButtonText: {
    color: colors.greyscaleDarker,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    marginLeft: 20,
  },
})

// Code mostly copied from https://dev.to/aneeqakhan/create-a-radio-button-from-the-scratch-in-react-native-3662
function FormRadioButton(props) {
  const { onPress, selected, children, style } = props

  return (
    <View style={[styles.radioButtonContainer, style]}>
      <TouchableOpacity onPress={onPress} style={styles.radioButtonOutline}>
        {selected ? <View style={styles.radioButtonSelectedIndicator} /> : null}
      </TouchableOpacity>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.radioButtonText}>{children}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default FormRadioButton
