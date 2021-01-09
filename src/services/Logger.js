import {
    padEnd,
    padStart,
} from 'lodash'

const DEBUG = 'DEBUG'
const ERROR = 'ERROR'
const FATAL = 'FATAL'
const INFO = 'INFO '
const WARN = 'WARN '

function formatLog(level, filename, message) {
    const d = new Date()
    const year  = d.getUTCFullYear()
    const month = padStart(d.getUTCMonth() + 1, 2, '0')  // months are zero-indexed
    const date = padStart(d.getUTCDate(), 2, '0')
    const hour = padStart(d.getUTCHours(), 2, '0')
    const minute = padStart(d.getUTCMinutes(), 2, '0')
    const second = padStart(d.getUTCSeconds(), 2, '0')
    const ms = padStart(d.getUTCMilliseconds(), 3, '0')  // always an integer between 0 and 999
    const paddedLevel = padEnd(level, 2)

    return `[${year}-${month}-${date}T${hour}:${minute}:${second}.${ms}Z] [${paddedLevel}] [${filename}] ${message}`
}

class Logger {
    constructor(filename) {
        this.filename = filename
    }

    debug(message, ...args) {
        console.log(formatLog(DEBUG, this.filename, message), ...args)
    }

    error(message, ...args) {
        console.log(formatLog(ERROR, this.filename, message), ...args)
    }

    fatal(message, ...args) {
        console.log(formatLog(FATAL, this.filename, message), ...args)
    }

    info(message, ...args) {
        console.log(formatLog(INFO, this.filename, message), ...args)
    }

    warn(message, ...args) {
        console.log(formatLog(WARN, this.filename, message), ...args)
    }
}

export  default Logger
