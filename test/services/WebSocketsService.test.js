// In-house dependencies
import * as WebSocketsService from '../../src/services/WebSocketsService'

describe('WebSocketsService', () => {
  describe('sendText', () => {
    const socketMock = {
      send: jest.fn(),
    }

    it('formats and sends the given text to the web socket', () => {
      const expected = JSON.stringify({
        type: 'message',
        data: 'Test text',
      })

      WebSocketsService.sendText('Test text', socketMock)

      expect(socketMock.send).toHaveBeenCalledWith(expected)
    })
  })
})
