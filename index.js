// Third-party dependencies
import "react-native-gesture-handler" // This must be at the top of the file. See https://reactnavigation.org/docs/en/next/getting-started.html
import {
    AppRegistry
} from 'react-native'

// In-house dependencies
import Root from './src/Root'
import {
    name as appName
} from './app.json'

AppRegistry.registerComponent(appName, () => Root)
