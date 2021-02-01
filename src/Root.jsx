import React, { useCallback, useState, useEffect } from 'react'
import StorybookUI from '../storybook'
import App from './App'

function Root() {
  const [storybookActive, setStorybookActive] = useState(false)

  const toggleStorybook = useCallback(() => setStorybookActive(active => !active), [])

  useEffect(() => {
    // eslint-disable-next-line no-undef
    if (__DEV__) {
      // eslint-disable-next-line global-require
      const DevMenu = require('react-native-dev-menu')
      DevMenu.addItem('Toggle Storybook', toggleStorybook)
    }
  }, [toggleStorybook])

  return storybookActive ? <StorybookUI /> : <App />
}

export default Root
