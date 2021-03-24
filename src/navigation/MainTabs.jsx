// Third-party dependencies
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHomeAlt, faExclamationCircle, faCheckSquare, faCommentAlt } from '@fortawesome/pro-light-svg-icons'

// In-house dependencies
import colors from '../resources/colors'
import HomeScreen from '../screens/HomeScreen'
import ExampleScreen from '../screens/ExampleScreen'
import ExampleScreen2 from '../screens/ExampleScreen2'
import ContactScreen from '../screens/ContactScreen'
import SCREEN from './ScreensEnum'

function MainTabs() {
  const Tab = createBottomTabNavigator()

  return (
    <Tab.Navigator
      headerMode="screen" // See https://reactnavigation.org/docs/stack-navigator#set-headermode-to-screen
      initialRouteName={SCREEN.HOME}
      tabBarOptions={{
        activeTintColor: colors.primaryDark,
        inactiveTintColor: colors.greyscaleDarkest,
      }}
    >
      <Tab.Screen
        name={SCREEN.HOME}
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => <FontAwesomeIcon icon={faHomeAlt} size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name={SCREEN.EXAMPLE2}
        component={ExampleScreen2}
        options={{
          tabBarLabel: 'Alert History',
          tabBarIcon: ({ color, size }) => <FontAwesomeIcon icon={faExclamationCircle} size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name={SCREEN.EXAMPLE}
        component={ExampleScreen}
        options={{
          tabBarLabel: 'Notifications',
          tabBarIcon: ({ color, size }) => <FontAwesomeIcon icon={faCheckSquare} size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name={SCREEN.CONTACT}
        component={ContactScreen}
        options={{
          tabBarLabel: 'Contact',
          tabBarIcon: ({ color, size }) => <FontAwesomeIcon icon={faCommentAlt} size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  )
}

export default MainTabs
