// Third-party dependencies
import React from 'react'
import { StyleSheet, View } from 'react-native'

// In-house dependencies
import FormRadioButton from '../FormRadioButton'
import FormLabel from '../FormLabel'
import Logger from '../../services/Logger'

const logger = new Logger('FormRadioButtonGroup')

const styles = StyleSheet.create({
  radioButtonGroupContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
})

function FormRadioButtonGroup(props) {
  const { children, values, setValues } = props

  function handlePress(selectedItem) {
    logger.debug(`Selected item: ${selectedItem.displayValue}`)
    const updatedState = values.map(item => {
      return { ...item, selected: item.id === selectedItem.id }
    })
    setValues(updatedState)
  }

  return (
    <>
      <FormLabel>{children}</FormLabel>
      <View style={styles.radioButtonGroupContainer}>
        {values.map(item => (
          <FormRadioButton onPress={() => handlePress(item)} selected={item.selected} key={item.id}>
            {item.displayValue}
          </FormRadioButton>
        ))}
      </View>
    </>
  )
}

export default FormRadioButtonGroup
