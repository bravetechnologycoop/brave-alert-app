// Third-party dependencies
import React from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import { get } from 'lodash'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'

// In-house dependencies
import BasicButton from '../BasicButton'
import ContactBraveBoxes from '../ContactBraveBoxes'
import colors from '../../resources/colors'
import { getErrorMessage } from '../../redux/selectors'
import { setErrorMessage } from '../../redux/slices/errorMessageSlice'

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
  detailsText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    color: colors.greyscaleDarker,
    marginBottom: 20,
    width: 300,
  },
})

function ErrorScreen(props) {
  const { navigation, route } = props

  const dispatch = useDispatch()
  const originalScreen = get(route, 'params.originalScreen', null)
  const errorMessage = useSelector(getErrorMessage)

  function handleDismiss() {
    dispatch(setErrorMessage(''))

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
        <Text style={styles.heading}>Something went wrong.</Text>

        <Text style={styles.bodyText}>Please try again, or contact Brave.</Text>

        <View style={styles.contactBraveContainer}>
          <ContactBraveBoxes />
        </View>

        <Text style={styles.detailsText}>{errorMessage}</Text>

        <BasicButton
          onPress={handleDismiss}
          backgroundColor={colors.primaryDark}
          borderColor={colors.primaryDark}
          fontColor={colors.greyscaleLightest}
          width={250}
          margin={20}
        >
          Dismiss
        </BasicButton>
      </SafeAreaView>
    </>
  )
}

export default ErrorScreen
