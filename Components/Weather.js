import React, { useState } from 'react'
import { ImageBackground, Text, StyleSheet, View } from 'react-native';
import Forecast from './Forecast.js';

export default function Weather(props) {
    const [forecastInfo, setForecastInfo] = useState({
        main: '-',
        description: '-',
        temp: 0
    })

    return (
        <ImageBackground source={require('../bg.png')} style={styles.backdrop}>
            <View style={styles.black_bar}>
                <Text style={styles.zip}>Zip Code is {props.zipCode}</Text>
                <Forecast {...forecastInfo} />
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    backdrop: {
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    black_bar: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: '100%',
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    zip: {
        color: '#ffffff'
    }
})