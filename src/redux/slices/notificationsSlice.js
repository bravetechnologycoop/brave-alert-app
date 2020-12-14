// Third-party dependencies
import {
    createSlice,
} from '@reduxjs/toolkit'

// In-house dependencies
import {
    NOTIFICATION_STATUS,
} from '../../constants.js'

const initialState = [
    {
        id: 'guid-111-aaa',
        subject: 'My notification',
        body: 'Cool new feature 1 has been deployed',
        timestamp: 1607796000000, // 2020-12-12 10:00:00
        notificationStatus: NOTIFICATION_STATUS.READ,
    },
]

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        notificationAdded(state) {
            state.push({
                id: 'guid-222-bbb',
                subject: 'My NEW notification',
                body: 'Cool new feature 2 has been deployed',
                timestamp: new Date('2020-12-13 13:00:00').getTime(),
                notificationStatus: NOTIFICATION_STATUS.NEW,
            })
        },
    },
})

export const {
    notificationAdded,
} = notificationsSlice.actions

export default notificationsSlice.reducer
