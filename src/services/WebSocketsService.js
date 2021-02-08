/* globals WebSocket:true */

// Functions that coordinate Web Socket communication with a server.
//
// Messages sent to and from our servers are in JSON and always have two
// fields, 'type' and 'data'. Possible values for 'type' are
// enumerated in WS_MESSAGE_TYPE.

const WS_MESSAGE_TYPE = {
  NEW_ALERT: 'NEW_ALERT',
  NEW_NOTIFICATION: 'NEW_NOTIFICATION',
}

function createWebSocket(url) {
  return new WebSocket(url)
}

function sendText(text, socket) {
  const message = {
    type: 'message',
    data: text,
  }

  socket.send(JSON.stringify(message))
}

export { WS_MESSAGE_TYPE, createWebSocket, sendText }
