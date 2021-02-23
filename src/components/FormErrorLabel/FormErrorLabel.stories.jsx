// Third-party dependencies
import React from 'react'
import { storiesOf } from '@storybook/react-native'

// In-house dependencies
import FormErrorLabel from '.'

storiesOf('FormErrorLabel', module)
  .add('Short text', () => <FormErrorLabel>Name:</FormErrorLabel>)
  .add('Long text', () => (
    <FormErrorLabel>What did you have for breakfast, lunch, snack, and dinner today, yesterday, and the day before?</FormErrorLabel>
  ))
