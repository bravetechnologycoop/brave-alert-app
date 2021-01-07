class FetchServiceError extends Error {

    constructor(...params) {
        super(...params)

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, FetchServiceError)
        }

        this.name = 'FetchServiceError'
    }
}

export default FetchServiceError