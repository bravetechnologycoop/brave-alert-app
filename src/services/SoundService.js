// Functions to start and stop sounds for alerts and messagess

// Third-party dependencies
import Sound from 'react-native-sound'

// In-house dependencies
import Logger from '../services/Logger'
import { safeReportError } from './ErrorReportingService'

// Setup logger
const logger = new Logger('SoundService')

// Setup React Native Sound
Sound.setCategory('Playback')

// Sound to play when there is an alert (mp3 from https://www.zedge.net/ringtone/5a172812-1926-3482-8edc-e9f9d468548a)
const alarm = new Sound('alarm_army.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
        safeReportError(error)
    }
})

function startAlarm() {
    alarm.play((success) => {
        if (success) {
            logger.debug('Successfully finished playing alarm')
        } else {
            logger.debug('Playback of alarm failed due to audio decoding errors')
        }
    })
    logger.debug('Started playing alarm')
}

function stopAlarm() {
    alarm.stop()
    logger.debug('Stopped playing alarm')
}

export {
    startAlarm,
    stopAlarm,
}