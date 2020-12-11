// Third-party dependencies
import React from 'react'
import {
    Button,
} from 'react-native'
import {
    useNavigation
} from "@react-navigation/native"

// In-house dependencies
import HistoricAlert from '../components/HistoricAlert'

function ExampleScreen2() {
    const navigation = useNavigation()

    return (
        <>
            <Button
                title="Go to OtherScreen"
                onPress={() => navigation.navigate('ExampleScreen')}
            />
            <HistoricAlert roomName='Example' time='10:00 AM' category='Overdose' isUrgent='false' />
        </>
    )
}

export default ExampleScreen2