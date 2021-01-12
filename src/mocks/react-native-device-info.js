// The official `react-native-device-info` package relies on native code to run.
// Because we do not run our tests on a device, there are no native functions to call.
//
// I really don't like this use of require in an otherwise ES6 module project, but coudln't
// find any other way to have conditional imports. I tried rewire, I tried proxyquire,
// I tried sinon. I tried react-native-mock. I couldn't get any of them to get in there early
// enough to stop the import from happening. So for now, this'll have to do. Or we'll need to 
// switch to Jest.

function getUniqueId() {
    return 'DEVICE_ID'
}

export {
    getUniqueId,
}
