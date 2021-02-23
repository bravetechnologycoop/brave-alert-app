// Third-party dependencies
import React, { useState } from 'react'
import { storiesOf } from '@storybook/react-native'

// In-house dependencies
import FormRadioButtonGroup from '.'

const oneValue = [{ id: 1, value: 'value1', displayValue: 'One Item', selected: true }]
const multipleValues = [
  { id: 1, value: 'value1', displayValue: 'Email', selected: false },
  { id: 2, value: 'value2', displayValue: 'Phone', selected: false },
  { id: 3, value: 'value3', displayValue: 'I do not need to be contacted', selected: true },
]

function FormRadioButtonGroupTest(props) {
  const { children, initialValues } = props

  const [values, setValues] = useState(initialValues)

  return (
    <FormRadioButtonGroup values={values} setValues={setValues}>
      {children}
    </FormRadioButtonGroup>
  )
}

storiesOf('FormRadioButtonGroup', module)
  .add('One value', () => <FormRadioButtonGroupTest initialValues={oneValue}>Here is just one value:</FormRadioButtonGroupTest>)
  .add('Multiple values', () => (
    <FormRadioButtonGroupTest initialValues={multipleValues}>
      Note that if you try to select a value, it will throw an error:
    </FormRadioButtonGroupTest>
  ))
