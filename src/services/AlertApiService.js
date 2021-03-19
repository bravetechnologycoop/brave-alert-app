// All the functions that call servers that use Brave Alert Lib

// In-house dependencies
import { post } from './FetchService'
import { getApiKey } from './CredentialsService'
import Logger from './Logger'
import { WS_MESSAGE_TYPE, createWebSocket, sendText } from './WebSocketsService'

const logger = new Logger('AlertApiService')

// /////////////////////////   WSS   /////////////////////////////

// Key is the baseUrl, value is the socket for that baseUrl
const sockets = {}

// Setup web socket
function startWebSocket(baseUrl) {
  sockets[baseUrl] = createWebSocket(`wss://${baseUrl}?apikey=${getApiKey()}`)
  sockets[baseUrl].onmessage = message => {
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

  sockets[baseUrl].onopen = () => {
    logger.info(`Websocket opened: ${baseUrl}`)
  }

  sockets[baseUrl].onclose = () => {
    logger.info(`Websocket closed: ${baseUrl}`)
  }
}

function testMessage(baseUrl) {
  sendText('Sending message from phone', sockets[baseUrl])
}

// /////////////////////////   HTTPS   /////////////////////////////

async function designateDeviceRequest(baseUrl, verificationCode) {
  return post({
    base: `https://${baseUrl}`,
    uri: '/alert/designatedevice',
    body: {
      verificationCode,
    },
    headers: {
      'X-API-KEY': getApiKey(),
      'Content-Type': 'application/json',
    },
  })
}

async function testRequest(baseUrl) {
  return post({
    base: `https://${baseUrl}`,
    uri: '/alert/test',
    headers: {
      'X-API-KEY': getApiKey(),
    },
  })
}

async function fakeEndpointRequest(baseUrl) {
  return post({
    base: `https://${baseUrl}`,
    uri: '/not/in/real/life',
    headers: {
      'X-API-KEY': getApiKey(),
    },
  })
}

export default {
  designateDeviceRequest,
  fakeEndpointRequest,
  startWebSocket,
  testMessage,
  testRequest,
}
