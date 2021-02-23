// Third-party dependencies
import React, { useState } from 'react'
import { storiesOf } from '@storybook/react-native'

// In-house dependencies
import ButtonWithCheckmark from '.'

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function ButtonWithCheckmarkTest(props) {
  const { label, transitionBack } = props

  const [fireTransition, setFireTransition] = useState(false)

  async function onPress() {
    setFireTransition(true)
    await sleep(100)
    setFireTransition(false)
  }

  return <ButtonWithCheckmark label={label} transitionBack={transitionBack} onPress={onPress} fireTransition={fireTransition} />
}

storiesOf('ButtonWithCheckmark', module)
  .add('Transitions from text to checkmark', () => <ButtonWithCheckmarkTest label="Submit" />)
  .add('Transitions from text to checkmark and back', () => <ButtonWithCheckmarkTest label="Submit" transitionBack />)
