// Third-party dependencies
import React from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { Controller } from 'react-hook-form'

// In-house dependencies
import FormLabel from '../FormLabel'
import FormErrorLabel from '../FormErrorLabel'
import colors from '../../resources/colors'

const styles = StyleSheet.create({
  field: {
    borderColor: colors.greyscaleDarkest,
    borderRadius: 10,
    borderWidth: 0.25,
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 4 },
    shadowColor: colors.greyscaleDarkest,
    marginBottom: 25,
    backgroundColor: colors.greyscaleLightest,
    height: 'auto',
    paddingLeft: 8,
    textAlignVertical: 'top',
  },
})

function FormTextInput(props) {
  const { children, name, control, rules, defaultValue, errors, multiline, errorMessage } = props

  return (
    <>
      <FormLabel>{children}</FormLabel>
      {errors[name] && <FormErrorLabel>{errorMessage}</FormErrorLabel>}
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={[styles.field, { height: multiline ? 163 : 42 }]}
            multiline={multiline}
            numberOfLines={multiline ? null : 1}
            onBlur={onBlur}
            onChangeText={text => onChange(text)}
            value={value}
          />
        )}
        name={name}
        rules={rules}
        defaultValue={defaultValue}
      />
    </>
  )
}

export default FormTextInput
