// This file runs before Jest tests

// Mock react-native-device-info
import mockRNDeviceInfo from 'react-native-device-info/jest/react-native-device-info-mock'
jest.mock('react-native-device-info', () => mockRNDeviceInfo)