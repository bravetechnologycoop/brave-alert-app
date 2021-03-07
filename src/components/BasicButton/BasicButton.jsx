// Third-party dependencies
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    borderRadius: 15,
    borderWidth: 2,
    borderStyle: 'solid',
    elevation: 4,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    shadowOpacity: 0.5,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  buttonText: {
    // color is given in props
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
  },
})

function ButtonWithCheckmark(props) {
  const { onPress, children, backgroundColor, borderColor, fontColor, width } = props

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={[styles.button, { backgroundColor, width, borderColor }]} onPress={onPress}>
        <Text style={[styles.buttonText, { color: fontColor }]}>{children}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ButtonWithCheckmark
