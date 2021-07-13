// Third-party dependencies
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHomeAlt, faExclamationCircle, faCheckSquare, faCommentAlt } from '@fortawesome/pro-light-svg-icons'

// In-house dependencies
import colors from '../resources/colors'
import HomeScreen from '../screens/HomeScreen'
import AlertHistoryScreen from '../screens/AlertHistoryScreen'
import ExampleScreen from '../screens/ExampleScreen'
import ContactScreen from '../screens/ContactScreen'
import SCREEN from './ScreensEnum'
import { getNewNotificationsCount } from '../redux/selectors'

function MainTabs() {
  const Tab = createBottomTabNavigator()
  const newNotificationsCount = useSelector(getNewNotificationsCount)

  // setting tabBarBadge to null removes the badge (see below)
  const notificationsTabBadge = newNotificationsCount > 0 ? newNotificationsCount : null

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
        name={SCREEN.ALERT_HISTORY}
        component={AlertHistoryScreen}
        options={{
          tabBarLabel: 'Alert History',
          tabBarIcon: ({ color, size }) => <FontAwesomeIcon icon={faExclamationCircle} size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name={SCREEN.NOTIFICATIONS}
        component={ExampleScreen}
        options={{
          tabBarLabel: 'Notifications',
          tabBarIcon: ({ color, size }) => <FontAwesomeIcon icon={faCheckSquare} size={size} color={color} />,
          tabBarBadge: notificationsTabBadge,
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
