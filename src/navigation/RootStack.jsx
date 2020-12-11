// Third-party dependencies
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

// In-house dependencies
import MainTabs from './MainTabs'

const Stack = createStackNavigator()

function RootStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator mode='modal' initialRouteName='Main'>
                <Stack.Screen
                    name='Main'
                    component={MainTabs}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootStack
