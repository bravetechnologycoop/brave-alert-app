// Third-party dependencies
import React from 'react'
import { storiesOf } from '@storybook/react-native'

// In-house dependencies
import FormRadioButton from '.'

storiesOf('FormRadioButton', module)
  .add('Selected Radio Button', () => (
    <FormRadioButton onPress={() => {}} selected key={1}>
      Option 1 is selected
    </FormRadioButton>
  ))
  .add('Unselected Radio Button', () => (
    <FormRadioButton onPress={() => {}} key={2}>
      Option 1 is unselected
    </FormRadioButton>
  ))
