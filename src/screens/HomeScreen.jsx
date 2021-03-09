// Third-party dependencies
import React from 'react'
import { Button, SafeAreaView, ScrollView, StyleSheet, StatusBar, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

// In-house dependencies
import { simulateCrash } from '../services/ErrorReportingService'
import SCREEN from '../navigation/ScreensEnum'
import colors from '../resources/colors'
import HomeScreenInstructions from '../components/HomeScreenInstructions'

function HomeScreen() {
  const navigation = useNavigation()

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
          <View style={styles.body}>
            <Text style={styles.welcomeText}>WELCOME</Text>

            { /* TODO: dynamically replace this text with notification and/or alert components as needed */ }
            <Text style={styles.noNewNotificationsText}>You have no new notifications or active alerts.</Text>

            { /* TODO: render instructions based on installation details */ }
            <HomeScreenInstructions renderButtonsInstructions={true} renderSensorsInstructions={true} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: colors.greyscaleLightest,
  },
  body: {
    backgroundColor: colors.greyscaleLightest,
  },
  welcomeText: {
    color: colors.primaryDark,
    fontFamily: 'Futura',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 25,
    lineHeight: 30,
    textAlign: 'center',
    letterSpacing: 4,
    marginTop: 70,
  },
  noNewNotificationsText: {
    color: colors.greyscaleLight,
    fontFamily: 'Roboto-Regular',
    fontSize: 18,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 35,
    marginLeft: 60,
    marginRight: 60,
  },
})

export default HomeScreen