// Functions to create and retrieve the device's Brave Alert API key

// Conditional dependencies :-(
const DeviceInfo = (process.env.APP_ENV === 'test')
    ? require('../mocks/react-native-device-info')
    : require('react-native-device-info')

function generateApiKey() {
    // For our current implementation, we don't need to explicitly do this
    // If we decide to go with a generated UUID, then this can change here

    // I imagine this being called when we send the message to backend to designate the device to a client
}

function getApiKey() {
    return DeviceInfo.getUniqueId()
}

function sanitizeApiKey(input) {
    return input.replace(new RegExp(getApiKey(), 'g'), 'SANITIZED_API_KEY')
}

export {
    generateApiKey,
    getApiKey,
    sanitizeApiKey,
}