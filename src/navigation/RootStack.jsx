// Third-party dependencies
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

// In-house dependencies
import MainTabs from './MainTabs'
import ErrorScreen from '../components/ErrorScreen'
import SCREEN from './ScreensEnum'

const Stack = createStackNavigator()

function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator mode="modal" initialRouteName="Main">
        <Stack.Screen name={SCREEN.MAIN} component={MainTabs} options={{ headerShown: false }} />
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
