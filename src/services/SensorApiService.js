// Functions that call the Brave Sensor server

// In-house dependencies
import { SENSOR_BASE_URL } from '@env'
import { post } from './FetchService'
import { getApiKey } from './CredentialsService'
import Logger from './Logger'
import { WS_MESSAGE_TYPE, createWebSocket } from './WebSocketsService'

const logger = new Logger('SensorApiService')

// Setup web socket
const socket = createWebSocket(`wss://${SENSOR_BASE_URL}`)
socket.onmessage = message => {
  let parsedData
  try {
    parsedData = JSON.parse(message.data)
  } catch (e) {
    logger.error(`Unable to parse ${JSON.stringify(message)}`)
    return
  }

  switch (parsedData.type) {
    case WS_MESSAGE_TYPE.NEW_ALERT:
      logger.info(`New alert handler: ${JSON.stringify(parsedData)}`)
      break
    case WS_MESSAGE_TYPE.NEW_NOTIFICATION:
      logger.info(`New notification handler: ${JSON.stringify(parsedData)}`)
      break
    default:
      // Do nothing
      logger.info(`Default alert handler: ${JSON.stringify(parsedData)}`)
      break
  }
}

const sensorRequest = {
  base: `https://${SENSOR_BASE_URL}`,
  headers: {
    'X-API-KEY': getApiKey(),
  },
}

async function testRequest() {
  return post({
    uri: '/alert/test',
    ...sensorRequest,
  })
}

async function fakeEndpointRequest() {
  return post({
    uri: 'not/in/real/life',
    ...sensorRequest,
  })
}

export default {
  fakeEndpointRequest,
  testRequest,
}
