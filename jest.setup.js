// This file runs before Jest tests

import mockRNDeviceInfo from 'react-native-device-info/jest/react-native-device-info-mock'
import { WebSocket } from 'mock-socket'

// Mock react-native-device-info
jest.mock('react-native-device-info', () => mockRNDeviceInfo)

// Mock WebSocket
global.WebSocket = WebSocket
