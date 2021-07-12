import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

export default function Forecast(props) {
    return (
        <View style={styles.forecast}>
            <Text style={styles.main}>{props.main}</Text>
            <Text style={styles.description}>{props.description}</Text>
            <View style={styles.temp_box}>
                <Text style={styles.temp}>{props.temp}</Text>
                <Text style={styles.celcius}>°C</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        color: '#ffffff',
        fontSize: 32
    }, 
    forecast: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    description: {
        color: '#ffffff',
        fontSize: 20
    },
    temp_box: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    temp: {
        color: '#ffffff',
        fontSize: 24,
        marginRight: 3
    },
    celcius: {
        color: '#ffffff',
        fontSize: 12
    }
})