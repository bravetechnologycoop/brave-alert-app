// Third-party dependencies
import { configureStore } from '@reduxjs/toolkit'

// In-house dependencies
import alertsReducer from './slices/alertsSlice'
import locationReducer from './slices/locationSlice'
import notificationsReducer from './slices/notificationsSlice'

const store = configureStore({
  reducer: {
    alerts: alertsReducer,
    location: locationReducer,
    notifications: notificationsReducer,
  },
})

export default store
