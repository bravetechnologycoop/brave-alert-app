// Third-party dependencies
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


// In-house dependencies
import ExampleScreen from '../screens/ExampleScreen'
import ExampleScreen2 from '../screens/ExampleScreen2'
import SCREEN from './ScreensEnum'

function MainTabs() {
    const Tab = createBottomTabNavigator()

    return (
        <Tab.Navigator
            headerMode='screen' // See https://reactnavigation.org/docs/stack-navigator#set-headermode-to-screen
            initialRouteName={SCREEN.EXAMPLE}
        >
            <Tab.Screen
                name={SCREEN.EXAMPLE}
                component={ExampleScreen}
            />
            <Tab.Screen
                name={SCREEN.EXAMPLE2}
                component={ExampleScreen2}
            />
        </Tab.Navigator>
    )
}

export default MainTabs