class FetchServiceUnauthorizedClientError extends Error {
  constructor(...params) {
    super(...params)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FetchServiceUnauthorizedClientError)
    }

    this.name = 'FetchServiceUnauthorizedClientError'
  }
}

export default FetchServiceUnauthorizedClientError
