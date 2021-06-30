// Third-party dependencies
import React, { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircle } from '@fortawesome/pro-light-svg-icons'
import { faCircle as faSolidCircle } from '@fortawesome/pro-solid-svg-icons'
import { castArray } from 'lodash'

// In-house dependencies
import InlineStack from '../InlineStack'
import colors from '../../resources/colors'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flexGrow: 1,
    backgroundColor: colors.greyscaleLightest,
    paddingTop: 10,
    paddingBottom: 4,
  },
  dotsContainer: {
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 14,
    marginTop: 10,
  },
})

function Cards(props) {
  const { children } = props

  const childCount = React.Children.count(children)
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [cardWidth, setCardWidth] = React.useState(0)

  function init(width) {
    // TODO address the cumulative misalignment caused by the rounding
    setCardWidth(Math.ceil(width / childCount))
  }

  function handleScroll(event) {
    const index = Math.round(event.nativeEvent.contentOffset.x / (event.nativeEvent.contentSize.width / childCount))
    setCurrentCardIndex(index)
  }

  function renderCard(card, index) {
    return (
      <View key={`card_${index}`} style={{ width: cardWidth }}>
        {card}
      </View>
    )
  }

  function renderDots(card, index) {
    const icon = index === currentCardIndex ? faSolidCircle : faCircle
    return <FontAwesomeIcon key={`indicator_${index}`} color={colors.greyscaleDark} icon={icon} size={parseInt(15, 10)} />
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        onContentSizeChange={width => init(width)}
        contentContainerStyle={{
          width: `${100 * childCount}%`,
        }}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={200}
        decelerationRate="fast"
        pagingEnabled
        onScroll={handleScroll}
      >
        {castArray(children).map(renderCard)}
      </ScrollView>

      <View style={styles.dotsContainer}>{children.length > 1 && <InlineStack gap={8}>{castArray(children).map(renderDots)}</InlineStack>}</View>
    </View>
  )
}

export default Cards
