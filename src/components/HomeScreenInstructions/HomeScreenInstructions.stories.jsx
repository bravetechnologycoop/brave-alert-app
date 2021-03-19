// Third-party dependencies
import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { ScrollView } from 'react-native'

// In-house dependencies
import HomeScreenInstructions from '.'

storiesOf('Home Screen Instructions', module)
  .addDecorator(story => <ScrollView contentInsetAdjustmentBehavior="automatic">{story()}</ScrollView>)
  .add('Buttons Instructions Only', () => <HomeScreenInstructions renderButtonsInstructions />)
  .add('Sensors Instructions Only', () => <HomeScreenInstructions renderSensorsInstructions />)
  .add('Sensors and Buttons Instructions', () => <HomeScreenInstructions renderButtonsInstructions renderSensorsInstructions />)
