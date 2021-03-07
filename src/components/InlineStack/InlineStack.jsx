// Third-party dependencies
import React from 'react'
import { View } from 'react-native'
import { castArray } from 'lodash'

function InlineStack(props) {
  const { children, gap, flexGrow = 0 } = props

  function renderChild(child, index) {
    const isFirstChild = index === 0

    return (
      <View
        key={`child_${index}`}
        style={{
          flexShrink: 1,
          flexDirection: 'row',
          flexGrow,
        }}
      >
        {!isFirstChild && <View style={{ flexShrink: 0, width: gap }} />}
        <View style={{ flexShrink: 1 }}>{child}</View>
      </View>
    )
  }

  return (
    <View style={{ flexShrink: 1, flexDirection: 'row' }}>
      {castArray(children)
        .filter(child => child !== false) // React's { false && () } syntax results in a false element
        .map(renderChild)}
    </View>
  )
}

export default InlineStack
