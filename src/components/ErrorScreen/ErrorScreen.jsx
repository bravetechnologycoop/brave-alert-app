import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { get } from 'lodash'
import colors from '../../resources/colors'

function ErrorScreen(props) {
  const { navigation, route } = props
  const originalScreen = get(route, 'params.originalScreen', null)

  function handleDismiss() {
    if (originalScreen) {
      navigation.navigate(originalScreen)
    } else {
      navigation.goBack()
    }
  }

  return (
    <>
      <View style={styles.container}>
        <Text>Error Screen</Text>
        <Button title="Dismiss" label="Dismiss" onPress={handleDismiss} />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.backgroundErrors,
  },
})

export default ErrorScreen
