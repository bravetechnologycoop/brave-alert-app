// Third-party dependencies
import React, { useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { faTimes } from '@fortawesome/pro-light-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

// In-house dependencies
import colors from '../../resources/colors'

const styles = StyleSheet.create({
  closeIcon: {
    color: colors.greyscaleDark,
    transform: [{ translateX: -10 }, { translateY: -10 }],
  },
  container: {
    width: '90%',
    borderRadius: 10,
    padding: 30,
  },
})

function ModalView(props) {
  const { children, backgroundColor, hasCloseButton, setNumVisibleModals } = props

  const [isVisible, setIsVisible] = useState(true)

  function onCloseButtonPress() {
    setIsVisible(false)
    setNumVisibleModals(numVisibleModals => numVisibleModals - 1)
  }

  return (
    <>
      {isVisible && (
        <View style={[styles.container, { backgroundColor }]}>
          {hasCloseButton && (
            <Pressable onPress={onCloseButtonPress}>
              <FontAwesomeIcon style={styles.closeIcon} icon={faTimes} size={26} />
            </Pressable>
          )}
          {children}
        </View>
      )}
    </>
  )
}

export default ModalView
