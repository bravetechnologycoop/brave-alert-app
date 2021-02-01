// Third-party dependencies
import { configureStore } from '@reduxjs/toolkit'

// In-house dependencies
import alertsReducer from './slices/alertsSlice'
import notificationsReducer from './slices/notificationsSlice'

const store = configureStore({
  reducer: {
    alerts: alertsReducer,
    notifications: notificationsReducer,
  },
})

export default store
