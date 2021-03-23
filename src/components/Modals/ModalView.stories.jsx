// Third-party dependencies
import React from 'react'
import { Text } from 'react-native'
import { storiesOf } from '@storybook/react-native'

// In-house dependencies
import ModalView from './ModalView'

storiesOf('ModalView', module)
  .add('Without close button', () => (
    <ModalView backgroundColor="lightblue">
      <Text>Content of modal</Text>
    </ModalView>
  ))
  .add('With close button', () => (
    <ModalView backgroundColor="lightgreen" hasCloseButton setNumVisibleModals={() => {}}>
      <Text>Content of modal</Text>
    </ModalView>
  ))
