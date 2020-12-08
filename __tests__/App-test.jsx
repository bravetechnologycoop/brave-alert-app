// Third-party dependencies
import 'react-native'
import React from 'react';

// In-house dependencies
import App from '../src/App'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'


// Do not actually call Sentry
jest.mock('@sentry/react-native', () => ({
    init: jest.fn()
}))

// Do not actually get the device version
jest.mock('react-native-device-info', () => ({
    getVersion: jest.fn()
}))

// Do not try to render third-party components
jest.mock('@fortawesome/react-native-fontawesome', () => ({
    FontAwesomeIcon: ''
}))

it('renders correctly', () => {
    renderer.create(<App />)
})
