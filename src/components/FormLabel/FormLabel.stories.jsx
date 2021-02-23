// Third-party dependencies
import React from 'react'
import { storiesOf } from '@storybook/react-native'

// In-house dependencies
import FormLabel from '.'

storiesOf('FormLabel', module)
  .add('Short text', () => <FormLabel>Name:</FormLabel>)
  .add('Long text', () => <FormLabel>What did you have for breakfast, lunch, snack, and dinner today, yesterday, and the day before?</FormLabel>)
