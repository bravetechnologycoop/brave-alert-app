// Third-party dependencies
import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { faPhoneRotary, faRunning } from '@fortawesome/pro-light-svg-icons'
import { Text } from 'react-native'

// In-house dependencies
import InfoBox from '.'

storiesOf('Info Box', module)
  .add('Info Box With Border', () => (
    <InfoBox drawBorder faIcon={faPhoneRotary}>
      <Text>Hello I Am A Phone</Text>
    </InfoBox>
  ))
  .add('Info Box With Border, Colour, and Icon Slash', () => (
    <InfoBox drawBorder drawIconCircle drawIconSlash color="#FF0000" faIcon={faRunning}>
      <Text>No Running Allowed</Text>
    </InfoBox>
  ))
