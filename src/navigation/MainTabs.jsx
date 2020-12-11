// Third-party dependencies
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


// In-house dependencies
import ExampleScreen from '../screens/ExampleScreen'
import ExampleScreen2 from '../screens/ExampleScreen2'

function MainTabs() {
    const Tab = createBottomTabNavigator()

    return (
        <Tab.Navigator
            headerMode='screen' // See https://reactnavigation.org/docs/stack-navigator#set-headermode-to-screen
            initialRouteName='ExampleScreen'
        >
            <Tab.Screen
                name='ExampleScreen'
                component={ExampleScreen}
            />
            <Tab.Screen
                name='ExampleScreen2'
                component={ExampleScreen2}
            />
        </Tab.Navigator>
    )
}

export default MainTabs