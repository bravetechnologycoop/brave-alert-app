// Third-party dependencies
import React from 'react'
import {
    Image,
    StyleSheet,
    Text,
    View
} from 'react-native'

// In-house dependencies
import colors from "../../resources/colors"
import images from "../../resources/images"

function HistoricAlert(props) {
    const { roomName, time, category, isUrgent } = props;

    return (
        <View style={styles.container}>
            <View style={styles.layout}>
                <Image 
                    style={styles.alertIcon}
                    source={isUrgent ? images.alert_icon_urgent : images.alert_icon}
                />
                <View style={styles.columnLayout}>
                    <View style={styles.summaryView}>
                        <Text style={styles.categoryText}>
                            {category}
                        </Text>
                        {category !== undefined && (
                            <Text style={styles.separator}>
                                |
                            </Text>
                        )}
                        <Text style={[
                            styles.timeText,
                            isUrgent ? styles.timeTextUrgent : styles.timeTextNormal,
                        ]}>
                            {time}
                        </Text>
                    </View>
                    <Text style={styles.roomText}>
                        {roomName}
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    alertIcon: {
        flex: 1,
        height: 75,
        marginLeft: 5,
        resizeMode: 'contain',
        width: 75,
    },
    categoryText: {
        color: colors.fontMedium,
        fontSize: 20,
    },
    columnLayout: {
        flexDirection: 'column',
        flex: 3,
        justifyContent: "flex-start",
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
        color: colors.fontDarkest,
        fontSize: 30,
        alignContent: 'flex-end'
    },
    separator: {
        color: colors.fontMedium,
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
        color: colors.fontAlertNormal,
    },
    timeTextUrgent: {
        color: colors.fontAlertUrgent,
    },
})

export default HistoricAlert