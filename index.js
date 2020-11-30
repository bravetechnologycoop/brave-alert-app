// Third-party dependencies
import {
    AppRegistry
} from 'react-native'

// In-house dependencies
import Root from './src/Root'
import {
    name as appName
} from './app.json'

AppRegistry.registerComponent(appName, () => Root)
