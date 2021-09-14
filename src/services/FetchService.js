// Functions for forming, sending, and handling HTTPS requests

// Third-party dependencies
import { isFunction } from 'lodash'

// In-house dependencies
import FetchServiceClientError from './errors/FetchServiceClientError'
import FetchServiceError from './errors/FetchServiceError'
import FetchServiceUnauthorizedClientError from './errors/FetchServiceUnauthorizedClientError'
import { sanitizeApiKey } from './CredentialsService'
import Logger from './Logger'

// Setup logger
const logger = new Logger('FetchService')

const DEFAULT_TIMEOUT_IN_MS = 25000

const HTTP_STATUS = {}
HTTP_STATUS.OK_200 = 200
HTTP_STATUS.CREATED_201 = 201
HTTP_STATUS.ACCEPTED_202 = 202
HTTP_STATUS.NO_CONTENT_204 = 204

HTTP_STATUS.BAD_REQUEST_400 = 400
HTTP_STATUS.UNAUTHORIZED_401 = 401
HTTP_STATUS.FORBIDDEN_403 = 403
HTTP_STATUS.NOT_FOUND_404 = 404
HTTP_STATUS.METHOD_NOT_ALLOWED_405 = 405
HTTP_STATUS.NOT_ACCEPTABLE_406 = 406
HTTP_STATUS.UNSUPPORTED_MEDIA_TYPE_415 = 415

HTTP_STATUS.INTERNAL_SERVER_ERROR_500 = 500
HTTP_STATUS.BAD_GATEWAY_502 = 502
HTTP_STATUS.SERVICE_UNAVAILABLE_503 = 503
HTTP_STATUS.GATEWAY_TIMEOUT_504 = 504

const on401Unauthorized = null

/// / Response handlers

async function handleSuccessWithContent(request, response) {
  const json = await response.json()
  if (request.transformResponse) {
    return request.transformResponse(json)
  }
  return json
}

async function handleSuccessWithoutContent() {
  return undefined
}

async function handleClientError(request, response) {
  const json = await response.json()

  if (request.asValidationError) {
    throw request.asValidationError(json)
  } else {
    throw new FetchServiceClientError(json)
  }
}

async function handle401Unauthorized(request, response) {
  const json = await response.json()

  if (isFunction(on401Unauthorized)) {
    on401Unauthorized()
  }

  throw new FetchServiceUnauthorizedClientError(JSON.stringify(json))
}

async function handleServerError(request, response) {
  const text = await response.text()
  throw new FetchServiceError(text)
}

const DEFAULT_RESPONSE_HANDLERS = {}

DEFAULT_RESPONSE_HANDLERS[HTTP_STATUS.OK_200] = handleSuccessWithContent
DEFAULT_RESPONSE_HANDLERS[HTTP_STATUS.CREATED_201] = handleSuccessWithContent
DEFAULT_RESPONSE_HANDLERS[HTTP_STATUS.ACCEPTED_202] = handleSuccessWithContent
DEFAULT_RESPONSE_HANDLERS[HTTP_STATUS.NO_CONTENT_204] = handleSuccessWithoutContent
DEFAULT_RESPONSE_HANDLERS[HTTP_STATUS.BAD_REQUEST_400] = handleClientError
DEFAULT_RESPONSE_HANDLERS[HTTP_STATUS.UNAUTHORIZED_401] = handle401Unauthorized
DEFAULT_RESPONSE_HANDLERS[HTTP_STATUS.FORBIDDEN_403] = handleClientError
DEFAULT_RESPONSE_HANDLERS[HTTP_STATUS.NOT_FOUND_404] = handleClientError
DEFAULT_RESPONSE_HANDLERS[HTTP_STATUS.METHOD_NOT_ALLOWED_405] = handleClientError
DEFAULT_RESPONSE_HANDLERS[HTTP_STATUS.NOT_ACCEPTABLE_406] = handleClientError
DEFAULT_RESPONSE_HANDLERS[HTTP_STATUS.UNSUPPORTED_MEDIA_TYPE_415] = handleClientError
DEFAULT_RESPONSE_HANDLERS[HTTP_STATUS.INTERNAL_SERVER_ERROR_500] = handleServerError
DEFAULT_RESPONSE_HANDLERS[HTTP_STATUS.BAD_GATEWAY_502] = handleServerError
DEFAULT_RESPONSE_HANDLERS[HTTP_STATUS.SERVICE_UNAVAILABLE_503] = handleServerError
DEFAULT_RESPONSE_HANDLERS[HTTP_STATUS.GATEWAY_TIMEOUT_504] = handleServerError

function selectResponseHandler(status, defaultResponseHandlers, customResponseHandlers) {
  if (customResponseHandlers && customResponseHandlers[status]) {
    return customResponseHandlers[status]
  }

  if (!defaultResponseHandlers[status]) {
    throw new Error(`No response handler for status code ${status}`)
  }

  return defaultResponseHandlers[status]
}

/// / URL manipulation and details of fetch construction

function toQueryString(params) {
  const esc = encodeURIComponent
  return Object.keys(params)
    .map(key => `${esc(key)}=${esc(params[key])}`)
    .join('&')
}

function toUrl(baseUri, uri, params) {
  const url = baseUri + uri
  if (params) {
    const queryString = toQueryString(params)
    return `${url}?${queryString}`
  }

  return url
}

function asFetchRequest(method, request) {
  return {
    method,
    params: request.params,
    body: request.body ? JSON.stringify(request.body) : undefined,
    headers: request.headers,
  }
}

async function doFetch(method, request) {
  const url = toUrl(request.base, request.uri, request.params)
  const fetchRequest = asFetchRequest(method, request)
  logger.debug(`FETCH REQUEST: ${sanitizeApiKey(JSON.stringify(fetchRequest))}, ${url}`)

  // Timeout code from https://dmitripavlutin.com/timeout-fetch-request/
  // eslint-disable-next-line no-undef
  const controller = new AbortController()
  const timeoutInMs = request.timeout || DEFAULT_TIMEOUT_IN_MS
  const timeoutId = setTimeout(() => {
    logger.error(`Request timed out: ${JSON.stringify(request)}`)
    controller.abort()
  }, timeoutInMs)

  // eslint-disable-next-line no-undef
  const response = await fetch(url, { ...fetchRequest, signal: controller.signal })
  logger.debug(`RESPONSE: ${JSON.stringify(response)}`)

  clearTimeout(timeoutId)

  const handleResponse = selectResponseHandler(response.status, DEFAULT_RESPONSE_HANDLERS, request.responseHandlers)
  return handleResponse(request, response)
}

/// /// High-level REST calls:

async function get(request) {
  return doFetch('get', request)
}

async function patch(request) {
  return doFetch('patch', request)
}

async function post(request) {
  return doFetch('post', request)
}

async function put(request) {
  return doFetch('put', request)
}

async function del(request) {
  return doFetch('delete', request)
}

export { del, get, patch, post, put, HTTP_STATUS }
