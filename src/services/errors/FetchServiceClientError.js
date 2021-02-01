class FetchServiceClientError extends Error {
  constructor(...params) {
    super(...params)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FetchServiceClientError)
    }

    this.name = 'FetchServiceClientError'
  }
}

export default FetchServiceClientError
