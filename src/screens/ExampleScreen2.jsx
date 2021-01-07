// Third-party dependencies
import React from 'react'
import {
    Button,
} from 'react-native'
import {
    useNavigation
} from '@react-navigation/native'
import {
    useSelector,
    useDispatch,
} from 'react-redux'

// In-house dependencies
import {
    ALERT_TYPE,
} from '../constants.js'
import HistoricAlert from '../components/HistoricAlert'
import {
    getAlerts,
} from '../redux/selectors'
import {
    alertUrgentified,
} from '../redux/slices/alertsSlice'
import {
    fakeEndpointRequest,
    testRequest,
} from '../services/BraveAlertService'
import {
    useSafeHandler,
} from '../hooks'
import SCREEN from '../navigation/ScreensEnum'

function ExampleScreen2() {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const [fireFakeEndpoint, fireFakeEndpointOptions] = useSafeHandler()
    const [fireTestRequest, fireTestRequestOptions] = useSafeHandler()

    const alerts = useSelector(getAlerts)

    function renderAlert(alert, index) {
        const timestamp = new Date(alert.createdTimestamp)
        const timeString = `${timestamp.getHours().toString().padStart(2, '0')}:${timestamp.getMinutes().toString().padStart(2, '0')}`
    
        return <HistoricAlert
            roomName={alert.location}
            time={timeString}
            category={alert.category}
            isUrgent={alert.alertType === ALERT_TYPE.BUTTONS_URGENT}
            key={index}
        />
    }

    function handleCallFakeEndpoint() {
        async function _handle() {
            await fakeEndpointRequest()
        }

        fireFakeEndpointOptions.reset()
        fireFakeEndpoint(_handle, {
            rollbackScreen: SCREEN.EXAMPLE2,
        })
    }

    function handleCallTestApi() {
        async function _handle() {
            const response = await testRequest()
            console.log(`*** testResponse *** ${JSON.stringify(response)}`)
        }

        fireTestRequestOptions.reset()
        fireTestRequest(_handle, {
            rollbackScreen: SCREEN.EXAMPLE2,
        })
    }

    return (
        <>
            <Button
                title="Go to OtherScreen"
                onPress={() => navigation.navigate(SCREEN.EXAMPLE)}
            />
            <HistoricAlert roomName='Example' time='10:00 AM' category='Overdose' isUrgent='false' />
            {alerts.map(renderAlert)}
            <Button
                title="Make Urgent"
                onPress={() => dispatch(alertUrgentified())}
            />
            <Button
                title="Call an API endpoint that doesn't exist"
                onPress={() => handleCallFakeEndpoint()}
            />
            <Button
                title="Call POST /alert/test"
                onPress={() => handleCallTestApi()}
            />
        </>
    )
}

export default ExampleScreen2