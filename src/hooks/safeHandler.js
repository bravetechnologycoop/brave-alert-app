import { useNavigation } from '@react-navigation/native'
import { useEffect, useRef, useState } from 'react'
import { isFunction } from 'lodash'
import { safeReportError } from '../services/ErrorReportingService'
import SCREEN from '../navigation/ScreensEnum'

// TODO provide a throttle param, for functions that return very quickly and don't have an obvious/safe
// hook for reset (e.g. add emergency contact)
export function useSafeHandler() {
    const navigation = useNavigation()
    const handlerState = useRef('ready') // one of ready, firing, cancelled
    const [isFiring, setIsFiring] = useState(false)
    
    useEffect(() => {
        return () => {
            handlerState.current = 'canceled'
        }
    }, [])

    function reset() {
        handlerState.current = 'ready'
        console.log('handler-state', handlerState.current)            
    }

    async function fire(fn, options = {}) {
        const { rollbackScreen = SCREEN.EXAMPLE } = options
    
        function handleError(error) { 
            safeReportError(error)
            navigation.navigate(SCREEN.ERROR, { originalScreen : rollbackScreen })
        }

        console.log('handler-state', handlerState.current)
        if (handlerState.current === 'firing' || handlerState.current === 'canceled') {
            console.log('Already firing, ignoring')
            return
        }

        try {                            
            handlerState.current = 'firing'
            console.log('handler-state', handlerState.current)
            if (isFunction(setIsFiring)) {
                setIsFiring(true)
            }                
            await fn()                
        } catch(error) {                     
            handleError(error, rollbackScreen)
            reset()
        } finally {
            if (handlerState.current !== 'canceled' && isFunction(setIsFiring)) {
                setIsFiring(false)
            }    
        }         
    }

    return [ fire, { reset, isFiring } ]
}
