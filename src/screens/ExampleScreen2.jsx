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
    alertUrgentified
} from '../redux/slices/alertsSlice'

function ExampleScreen2() {
    const navigation = useNavigation()
    const dispatch = useDispatch()

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

    return (
        <>
            <Button
                title="Go to OtherScreen"
                onPress={() => navigation.navigate('ExampleScreen')}
            />
            <HistoricAlert roomName='Example' time='10:00 AM' category='Overdose' isUrgent='false' />
            {alerts.map(renderAlert)}
            <Button
                title="Make Urgent"
                onPress={() => dispatch(alertUrgentified())}
            />
        </>
    )
}

export default ExampleScreen2