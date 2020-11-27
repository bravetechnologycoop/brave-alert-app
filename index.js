// Third-party dependencies
import {
    AppRegistry
} from 'react-native'

// In-house dependencies
import App from './src/App'
import {
    name as appName
} from './app.json'

AppRegistry.registerComponent(appName, () => App)
