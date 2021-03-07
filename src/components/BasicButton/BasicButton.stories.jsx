// Third-party dependencies
import React from 'react'
import { storiesOf } from '@storybook/react-native'

// In-house dependencies
import BasicButton from '.'

storiesOf('BasicButton', module)
  .add('Filled In', () => (
    <BasicButton backgroundColor="lightblue" borderColor="lightblue" fontColor="white" width={200}>
      Connect to App
    </BasicButton>
  ))
  .add('Draw Border is true', () => (
    <BasicButton backgroundColor="lightgrey" borderColor="red" fontColor="black" width={150}>
      Done
    </BasicButton>
  ))
