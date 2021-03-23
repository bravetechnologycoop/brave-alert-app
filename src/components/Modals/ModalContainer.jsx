// Third-party dependencies
import React from 'react'
import { Modal, ScrollView, StyleSheet, View } from 'react-native'

// In-house dependencies
import colors from '../../resources/colors'

const styles = StyleSheet.create({
  centeredBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.greyscaleTransparent,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 2000,
  },
})

function ModalContainer(props) {
  const { children, isModalVisible } = props
  return (
    <>
      <View style={styles.container}>
        <Modal transparent visible={isModalVisible} style={{ justifyContent: 'center', alignItems: 'center', margin: 0 }}>
          <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.centeredBackground}>{children}</View>
          </ScrollView>
        </Modal>
      </View>
    </>
  )
}

export default ModalContainer
