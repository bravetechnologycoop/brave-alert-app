// Third-party dependencies
import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { faPhoneRotary, faRunning } from '@fortawesome/pro-light-svg-icons'
import { Text, View } from 'react-native'

// In-house dependencies
import { InfoBox, InfoBoxMainContent } from '.'

storiesOf('InfoBox', module)
  .addDecorator(story => <View style={{ height: 160 }}>{story()}</View>)
  .add('Box With Border', () => (
    <InfoBox drawBorder>
      <InfoBoxMainContent faIcon={faPhoneRotary}>
        <Text>Hello I Am A Phone</Text>
      </InfoBoxMainContent>
    </InfoBox>
  ))
  .add('Box With Border, Colour, and Icon Slash', () => (
    <InfoBox drawBorder color="#FF0000">
      <InfoBoxMainContent drawIconCircle drawIconSlash color="#FF0000" faIcon={faRunning}>
        <Text>No Running Allowed</Text>
      </InfoBoxMainContent>
    </InfoBox>
  ))
