// Third-party dependencies
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

// In-house dependencies
import colors from '../../resources/colors'
import images from '../../resources/images'

const styles = StyleSheet.create({
  alertIcon: {
    flex: 1,
    height: 75,
    marginLeft: 5,
    resizeMode: 'contain',
    width: 75,
  },
  categoryText: {
    color: colors.greyscaleLight,
    fontSize: 20,
  },
  columnLayout: {
    flexDirection: 'column',
    flex: 3,
    justifyContent: 'flex-start',
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    height: 102,
    width: '90%',
  },
  layout: {
    flex: 1,
    flexDirection: 'row',
  },
  roomText: {
    color: colors.greyscaleDarkest,
    fontSize: 30,
    alignContent: 'flex-end',
  },
  separator: {
    color: colors.greyscaleLight,
    fontSize: 20,
    paddingHorizontal: 10,
  },
  summaryView: {
    flex: 1,
    flexDirection: 'row',
  },
  timeText: {
    fontSize: 20,
  },
  timeTextNormal: {
    color: colors.alertActive,
  },
  timeTextUrgent: {
    color: colors.urgentActive,
  },
})

function HistoricAlert(props) {
  const { roomName, time, category, isUrgent } = props

  return (
    <View style={styles.container}>
      <View style={styles.layout}>
        <Image style={styles.alertIcon} source={isUrgent ? images.alert_icon_urgent : images.alert_icon} />
        <View style={styles.columnLayout}>
          <View style={styles.summaryView}>
            <Text style={styles.categoryText}>{category}</Text>
            {category !== undefined && <Text style={styles.separator}>|</Text>}
            <Text style={[styles.timeText, isUrgent ? styles.timeTextUrgent : styles.timeTextNormal]}>{time}</Text>
          </View>
          <Text style={styles.roomText}>{roomName}</Text>
        </View>
      </View>
    </View>
  )
}

export default HistoricAlert
