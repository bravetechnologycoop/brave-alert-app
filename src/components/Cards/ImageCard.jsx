// Third-party dependencies
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

// In-house dependencies
import { Image, StyleSheet, Text, View } from 'react-native'
import colors from '../../resources/colors'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  image: {
    height: 165,
    width: 150,
  },
  imageContainer: {
    marginBottom: 25,
  },
  text: {
    color: colors.greyscaleDark,
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    lineHeight: 18,
    textAlign: 'center',
    width: 215,
  },
})

function ImageCard(props) {
  const { imageSource, icon, text } = props

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {imageSource && <Image style={styles.image} source={imageSource} />}
        {icon && <FontAwesomeIcon icon={icon} size={165} color={colors.primaryDark} />}
      </View>
      <Text style={styles.text}>{text}</Text>
    </View>
  )
}

export default ImageCard
