// Third-party dependencies
import React from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import { get } from 'lodash'
import { SafeAreaView } from 'react-native-safe-area-context'

// In-house dependencies
import BasicButton from '../BasicButton'
import ContactBraveBoxes from '../ContactBraveBoxes'
import colors from '../../resources/colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.greyscaleLighter,
  },
  contactBraveContainer: {
    height: 185,
    width: 300,
    marginBottom: 30,
  },
  heading: {
    fontFamily: 'Roboto-Regular',
    fontSize: 26,
    color: colors.primaryDark,
    paddingHorizontal: 10,
    marginBottom: 8,
  },
  bodyText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 18,
    color: colors.primaryDark,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
})

function ErrorScreen(props) {
  const { navigation, route } = props
  const originalScreen = get(route, 'params.originalScreen', null)
  const error = get(route, 'params.error', null)
  console.log(`*********************TKD in ErrorScreen: ${error.toString()} ***********`)

  function handleDismiss() {
    if (originalScreen) {
      navigation.navigate(originalScreen)
    } else {
      navigation.goBack()
    }
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        {error && <Text>{error.toString()}</Text>}
        {!error === 0 && (
          <>
            <Text style={styles.heading}>Something went wrong.</Text>

            <Text style={styles.bodyText}>Please try again, or contact Brave.</Text>

            <View style={styles.contactBraveContainer}>
              <ContactBraveBoxes />
            </View>
          </>
        )}
        <BasicButton
          onPress={handleDismiss}
          backgroundColor={colors.primaryDark}
          borderColor={colors.primaryDark}
          fontColor={colors.greyscaleLightest}
          width={250}
        >
          Dismiss
        </BasicButton>
      </SafeAreaView>
    </>
  )
}

export default ErrorScreen
