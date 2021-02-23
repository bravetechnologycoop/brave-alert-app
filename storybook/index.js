import React from 'react'
import { getStorybookUI, configure, addDecorator } from '@storybook/react-native'
import { withKnobs } from '@storybook/addon-knobs'
import './rn-addons'
import { loadStories } from './storyLoader'

// In-house dependencies
import { STORYBOOK_HOST } from '@env'

// enables knobs for all stories
addDecorator(withKnobs)
addDecorator(Story => <Story />)

// import stories
configure(() => {
  loadStories()
}, module)

// Refer to https://github.com/storybookjs/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({
  asyncStorage: null,
  // Specify the host as follows if, on your device, the default (localhost) does not resolve to your Storybook server
  host: STORYBOOK_HOST || 'localhost',
})

export default StorybookUIRoot
