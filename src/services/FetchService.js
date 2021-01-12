// Nuts and bolts behind how API calls are formed, sent, and handled

// Third-party dependencies
import {
    omitBy,
    isNil,
    isFunction,
} from 'lodash'

// In-house dependencies
import {
    BUTTONS_BASE_URL,
    SENSOR_BASE_URL
} from '@env'
import FetchServiceClientError from './errors/FetchServiceClientError'
import FetchServiceError from './errors/FetchServiceError'
import FetchServiceUnauthorizedClientError from './errors/FetchServiceUnauthorizedClientError'
import {
    getApiKey,
    sanitizeApiKey,
} from './CredentialsService'
import Logger from './Logger'

// Setup logger
const logger = new Logger('FetchService')

const HTTP_200_OK = 200
const HTTP_201_CREATED = 201
const HTTP_202_ACCEPTED = 202
const HTTP_204_NO_CONTENT = 204

const HTTP_400_BAD_REQUEST = 400
const HTTP_401_UNAUTHORIZED = 401
const HTTP_403_FORBIDDEN = 403
const HTTP_404_NOT_FOUND = 404
const HTTP_405_METHOD_NOT_ALLOWED = 405
const HTTP_406_NOT_ACCEPTABLE = 406
const HTTP_415_UNSUPPORTED_MEDIA_TYPE = 415

const HTTP_500_INTERNAL_SERVER_ERROR = 500
const HTTP_502_BAD_GATEWAY = 502
const HTTP_503_SERVICE_UNAVAILABLE = 503
const HTTP_504_GATEWAY_TIMEOUT = 504

let on401Unauthorized = null

//// Response handlers

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
        throw new FetchServiceClientError(JSON.stringify(json))
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

DEFAULT_RESPONSE_HANDLERS[HTTP_200_OK] = handleSuccessWithContent
DEFAULT_RESPONSE_HANDLERS[HTTP_201_CREATED] = handleSuccessWithContent
DEFAULT_RESPONSE_HANDLERS[HTTP_202_ACCEPTED] = handleSuccessWithContent
DEFAULT_RESPONSE_HANDLERS[HTTP_204_NO_CONTENT] = handleSuccessWithoutContent
DEFAULT_RESPONSE_HANDLERS[HTTP_400_BAD_REQUEST] = handleClientError
DEFAULT_RESPONSE_HANDLERS[HTTP_401_UNAUTHORIZED] = handle401Unauthorized
DEFAULT_RESPONSE_HANDLERS[HTTP_403_FORBIDDEN] = handleClientError
DEFAULT_RESPONSE_HANDLERS[HTTP_404_NOT_FOUND] = handleClientError
DEFAULT_RESPONSE_HANDLERS[HTTP_405_METHOD_NOT_ALLOWED] = handleClientError
DEFAULT_RESPONSE_HANDLERS[HTTP_406_NOT_ACCEPTABLE] = handleClientError
DEFAULT_RESPONSE_HANDLERS[HTTP_415_UNSUPPORTED_MEDIA_TYPE] = handleClientError
DEFAULT_RESPONSE_HANDLERS[HTTP_500_INTERNAL_SERVER_ERROR] = handleServerError
DEFAULT_RESPONSE_HANDLERS[HTTP_502_BAD_GATEWAY] = handleServerError
DEFAULT_RESPONSE_HANDLERS[HTTP_503_SERVICE_UNAVAILABLE] = handleServerError
DEFAULT_RESPONSE_HANDLERS[HTTP_504_GATEWAY_TIMEOUT] = handleServerError

function selectResponseHandler(
    status,
    defaultResponseHandlers,
    customResponseHandlers
) {
    if (customResponseHandlers && customResponseHandlers[status]) {
        return customResponseHandlers[status]
    }

    if (!defaultResponseHandlers[status]) {
        throw new Error(`No response handler for status code ${status}`)
    }

    return defaultResponseHandlers[status]
}

//// URL manipulation and details of fetch construction

function toQueryString(params) {
    const esc = encodeURIComponent
    return Object.keys(params)
        .map((key) => `${esc(key)}=${esc(params[key])}`)
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

function withAppHeaders(additionalHeaders = {}) {
    const headers = { ...additionalHeaders }

    // Here's where you will add headers that need to be on every request
    headers['X-API-Key'] = getApiKey()

    return omitBy(headers, isNil)
}

function asFetchRequest(method, url, request, headers) {
    return {
        method,
        params: request.params,
        body: request.body ? JSON.stringify(request.body) : undefined,
        headers,
    }
}

async function doSingleFetch(method, headers, baseUrl, request) {
    const url = toUrl(baseUrl, request.uri, request.params)
    const fetchRequest = asFetchRequest(method, url, request, headers)
    logger.debug(`FETCH REQUEST: ${sanitizeApiKey(JSON.stringify(fetchRequest))}, ${url}`)
    // eslint-disable-next-line no-undef
    const response = await fetch(url, fetchRequest)
    logger.debug(`RESPONSE: ${JSON.stringify(response)}`)

    return response
}

// eslint-disable-next-line consistent-return
async function doFetch(method, request) {
    const headers = withAppHeaders(request.additional_headers)
    
    // TODO Talk about this function's logic and see what makes the most sense for sending
    // to both Buttons and Sensor backends
    const buttonsResponse = await doSingleFetch(method, headers, BUTTONS_BASE_URL, request)
    const sensorResponse = await doSingleFetch(method, headers, SENSOR_BASE_URL, request)

    // If we got a good response back from Buttons then use it. Otherwise, use the sensors response.
    const response = (buttonsResponse.status === HTTP_200_OK) ? buttonsResponse : sensorResponse

    const handleResponse = selectResponseHandler(
        response.status,
        DEFAULT_RESPONSE_HANDLERS,
        request.responseHandlers
    )

    return handleResponse(request, response)
}

////// High-level REST calls:

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

export {
    del,
    get,
    patch,
    post,
    put,
}
