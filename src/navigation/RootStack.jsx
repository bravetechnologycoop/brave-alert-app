// Third-party dependencies
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { useSelector } from 'react-redux'

// In-house dependencies
import MainTabs from './MainTabs'
import OnboardingScreen from '../screens/OnboardingScreen'
import ErrorScreen from '../components/ErrorScreen'
import SplashScreen from '../screens/SplashScreen'
import SCREEN from './ScreensEnum'
import { getLocationName } from '../redux/selectors'
import Logger from '../services/Logger'

// Setup logger
const logger = new Logger('RootStack')

const Stack = createStackNavigator()

function RootStack() {
  const org = useSelector(getLocationName)
  logger.info(`Got organization from global location state: ${org}`)

  const initialRouteName = SCREEN.SPLASH

  return (
    <NavigationContainer>
      <Stack.Navigator mode="modal" initialRouteName={initialRouteName}>
        <Stack.Screen name={SCREEN.MAIN} component={MainTabs} options={{ headerShown: false, animationEnabled: false }} />
        <Stack.Screen
          name={SCREEN.SPLASH}
          component={SplashScreen}
          options={{
            header: () => {
              return null
            },
          }}
        />
        <Stack.Screen
          name={SCREEN.ONBOARDING}
          component={OnboardingScreen}
          options={{
            header: () => {
              return null
            },
          }}
        />
        <Stack.Screen
          name={SCREEN.ERROR}
          component={ErrorScreen}
          options={{
            header: () => {
              return null
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootStack
