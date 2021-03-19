// Third-party dependencies
import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { faPhoneRotary, faRunning } from '@fortawesome/pro-light-svg-icons'
import { Text, View } from 'react-native'

// In-house dependencies
import InfoBox from '.'

storiesOf('InfoBox', module)
  .addDecorator(story => <View style={{ height: 160 }}>{story()}</View>)
  .add('Box With Border', () => (
    <InfoBox drawBorder faIcon={faPhoneRotary}>
      <Text>Hello I Am A Phone</Text>
    </InfoBox>
  ))
  .add('Box With Border, Colour, and Icon Slash', () => (
    <InfoBox drawBorder drawIconCircle drawIconSlash color="#FF0000" faIcon={faRunning}>
      <Text>No Running Allowed</Text>
    </InfoBox>
  ))
