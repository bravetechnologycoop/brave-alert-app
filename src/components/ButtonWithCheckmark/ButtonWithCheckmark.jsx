// Third-party dependencies
import React, { useRef, useEffect } from 'react'
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheckCircle } from '@fortawesome/pro-light-svg-icons'

// In-house dependencies
import colors from '../../resources/colors'

// Configuration of how the opacity will change during the transition animation
const fadeOutConfig = {
  toValue: 0,
  duration: 100,
  useNativeDriver: true,
}
const fadeInConfig = {
  toValue: 1,
  duration: 100,
  useNativeDriver: true,
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primaryMedium,
    alignItems: 'center',
    justifyContent: 'center',
    width: 130,
    height: 45,
    marginBottom: 45,
    borderRadius: 15,
    elevation: 4,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    shadowOpacity: 0.5,
  },
  buttonCheckmark: {
    color: colors.greyscaleLightest,
    transform: [{ translateY: -10 }], // Centres the icon vertically on the button
  },
  buttonContainer: {
    alignItems: 'center',
  },
  buttonText: {
    color: colors.greyscaleLightest,
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    transform: [{ translateY: 16 }], // Centres the text vertically on the button
  },
})

function ButtonWithCheckmark(props) {
  const { onPress, label, transitionBack, fireTransition } = props

  // Initially the button text is visible and the button icon is not
  const textFadeAnimation = useRef(new Animated.Value(1)).current
  const iconFadeAnimation = useRef(new Animated.Value(0)).current

  // Listen for changes to fireTransition
  useEffect(() => {
    if (fireTransition) {
      // Fade from text to icon
      const sequence = [Animated.timing(textFadeAnimation, fadeOutConfig), Animated.timing(iconFadeAnimation, fadeInConfig)]

      if (transitionBack) {
        // Wait and then fade from icon to text
        sequence.push(Animated.delay(1000), Animated.timing(iconFadeAnimation, fadeOutConfig), Animated.timing(textFadeAnimation, fadeInConfig))
      }

      Animated.sequence(sequence).start()
    }
  }, [fireTransition])

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Animated.Text style={[styles.buttonText, { opacity: textFadeAnimation }]}>{label}</Animated.Text>
        <Animated.View style={{ opacity: iconFadeAnimation }}>
          <FontAwesomeIcon style={styles.buttonCheckmark} icon={faCheckCircle} size={30} />
        </Animated.View>
      </TouchableOpacity>
    </View>
  )
}

export default ButtonWithCheckmark
