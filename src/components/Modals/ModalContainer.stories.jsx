// Third-party dependencies
import React, { useState } from 'react'
import { Text } from 'react-native'
import { storiesOf } from '@storybook/react-native'

// In-house dependencies
import ModalView from './ModalView'
import ModalContainer from './ModalContainer'

function ModalContainerTestWithOneModal() {
  const [numVisibleModals, setNumVisibleModals] = useState(1)

  return (
    <ModalContainer isModalVisible={numVisibleModals > 0}>
      <ModalView hasCloseButton backgroundColor="lightblue" setNumVisibleModals={setNumVisibleModals}>
        <Text>Content of modal</Text>
      </ModalView>
    </ModalContainer>
  )
}

function ModalContainerTestWithTwoModals() {
  const [numVisibleModals, setNumVisibleModals] = useState(2)

  return (
    <ModalContainer isModalVisible={numVisibleModals > 0}>
      <ModalView hasCloseButton backgroundColor="lightblue" setNumVisibleModals={setNumVisibleModals}>
        <Text>Content of modal</Text>
      </ModalView>
      <ModalView hasCloseButton backgroundColor="lightpink" setNumVisibleModals={setNumVisibleModals}>
        <Text>Content of modal 2</Text>
      </ModalView>
    </ModalContainer>
  )
}

storiesOf('ModalContainer', module)
  .add('With one modal', () => <ModalContainerTestWithOneModal />)
  .add('With two modals', () => <ModalContainerTestWithTwoModals />)
