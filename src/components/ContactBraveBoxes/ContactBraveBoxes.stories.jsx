// Third-party dependencies
import React from 'react'
import { View } from 'react-native'
import { storiesOf } from '@storybook/react-native'

// In-house dependencies
import ContactBraveBoxes from '.'

storiesOf('ContactBraveBoxes', module)
  .addDecorator(story => <View style={{ height: 300 }}>{story()}</View>)
  .add('Normal', () => <ContactBraveBoxes />)
  .add('Hide email', () => <ContactBraveBoxes hideEmail />)
