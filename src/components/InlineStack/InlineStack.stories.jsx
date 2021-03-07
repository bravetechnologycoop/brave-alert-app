// Third-party dependencies
import React from 'react'
import { Text } from 'react-native'
import { storiesOf } from '@storybook/react-native'

// In-house dependencies
import InlineStack from './InlineStack'

storiesOf('InlineStack', module)
  .add('gap of 8', () => (
    <InlineStack gap={8}>
      <Text>One</Text>
      <Text>Two</Text>
      <Text>Three</Text>
    </InlineStack>
  ))
  .add('gap of 16', () => (
    <InlineStack gap={16}>
      <Text>One</Text>
      <Text>Two</Text>
      <Text>Three</Text>
    </InlineStack>
  ))
