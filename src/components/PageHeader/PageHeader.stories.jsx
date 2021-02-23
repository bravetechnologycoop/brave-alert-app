// Third-party dependencies
import React from 'react'
import { storiesOf } from '@storybook/react-native'

// In-house dependencies
import PageHeader from '.'

storiesOf('PageHeader', module)
  .add('Short text', () => <PageHeader>My Page</PageHeader>)
  .add('Long text', () => (
    <PageHeader>My beautiful, wonderful, amazing, super, awesome, fantastic, stupendous, great, swell, splendid, magnificient page!</PageHeader>
  ))
