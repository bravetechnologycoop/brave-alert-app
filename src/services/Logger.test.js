// Third-party dependencies
import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import {
    afterEach,
    beforeEach,
    describe,
    it,
} from 'mocha'

chai.use(sinonChai)

// In-house dependencies
import Logger from './Logger'

// Setup logger
const logger = new Logger('testFileName')

describe('LoogingService', () => {
    beforeEach(() => {
        sinon.spy(console, 'log')
    })

    afterEach(() => {
        console.log.restore()

        this.clock.restore()
    })

    it('debug outputs formatted DEBUG string (with a date that needs as much padding as possible)', () => {
        this.clock = sinon.useFakeTimers(new Date(1577934245006))
        
        logger.debug('log Message1')

        expect(console.log).to.have.been.calledWith('[2020-01-02T03:04:05.006Z] [DEBUG] [testFileName] log Message1')
    })

    it('error outputs formatted ERROR string (with a date that needs no padding)', () => {
        this.clock = sinon.useFakeTimers(new Date(1606751135123))
        
        logger.error('log Message2')

        expect(console.log).to.have.been.calledWith('[2020-11-30T15:45:35.123Z] [ERROR] [testFileName] log Message2')
    })

    it('fatal outputs formatted FATAL string (with a date that is the maximum of each component value)', () => {
        this.clock = sinon.useFakeTimers(new Date(1640995199999))
        
        logger.fatal('log Message3')

        expect(console.log).to.have.been.calledWith('[2021-12-31T23:59:59.999Z] [FATAL] [testFileName] log Message3')
    })

    it('info outputs formatted INFO string (with a date that is the minimum of each component value)', () => {
        this.clock = sinon.useFakeTimers(new Date(631152000000))
        
        logger.info('log Message4')

        expect(console.log).to.have.been.calledWith('[1990-01-01T00:00:00.000Z] [INFO ] [testFileName] log Message4')
    })

    it('warn outputs formatted WARN string (with a leap year)', () => {
        this.clock = sinon.useFakeTimers(new Date(1078086786000))
        
        logger.warn('log Message5')

        expect(console.log).to.have.been.calledWith('[2004-02-29T20:33:06.000Z] [WARN ] [testFileName] log Message5')
    })

    it('methods use the filename provided in the constructor', () => {
        this.clock = sinon.useFakeTimers(new Date(631152000000))
        
        const differentLogger = new Logger('differentFilename')
        differentLogger.info('log Message6')

        expect(console.log).to.have.been.calledWith('[1990-01-01T00:00:00.000Z] [INFO ] [differentFilename] log Message6')
    })

    it('methods passes along any number of extra object parameters', () => {
        this.clock = sinon.useFakeTimers(new Date(631152000000))
        const object1 = new Date()
        const object2 = {
            'test': 'value',
            'test2': 'value2',
        }
        const object3 = [
            100,
            {
                'greeting': 'hello',
            },
        ]

        logger.info('message', object1, object2, object3)

        expect(console.log).to.have.been.calledWith('[1990-01-01T00:00:00.000Z] [INFO ] [testFileName] message', object1, object2, object3)

    })
})