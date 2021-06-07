// Third-party dependencies
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

// In-house dependencies
import colors from '../../resources/colors'

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 30,
  },
  title: {
    color: colors.primaryDark,
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    textAlign: 'center',
  },
})

function PageHeader(props) {
  const { children } = props

  return (
    <>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{children}</Text>
      </View>
    </>
  )
}

export default PageHeader
