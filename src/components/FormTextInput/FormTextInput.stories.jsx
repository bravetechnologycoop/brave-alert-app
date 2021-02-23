// Third-party dependencies
import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { useForm } from 'react-hook-form'

// In-house dependencies
import FormTextInput from '.'

function FormTextInputTest(props) {
  const { children, name, rules, defaultValue, multiline, errorMessage } = props

  const { control, errors } = useForm({
    mode: 'all',
  })

  return (
    <FormTextInput
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      errors={errors}
      multiline={multiline}
      errorMessage={errorMessage}
    >
      {children}
    </FormTextInput>
  )
}

storiesOf('FormTextInput', module)
  .add('One line', () => (
    <FormTextInputTest name="input1" defaultValue="">
      Name:
    </FormTextInputTest>
  ))
  .add('Multiple lines', () => (
    <FormTextInputTest name="input2" defaultValue="" multiline>
      Message:
    </FormTextInputTest>
  ))
  .add('Required rule with error message', () => (
    <FormTextInputTest name="input3" defaultValue="" multiline errorMessage="This field is required." rules={{ required: 'input3' }}>
      Type in this box and then delete all the text to see the error message:
    </FormTextInputTest>
  ))
