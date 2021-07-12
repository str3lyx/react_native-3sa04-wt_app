import React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native';
import Weather from './Weather.js';
import { StatusBar } from 'expo-status-bar'

export default function WeatherScreen({route}) {

    var test = 0
    console.log(Dimensions.get('window').height)

    return (
        <View>
            <Weather zipCode={route.params.zipCode} style={styles.screen}/>
            <StatusBar style={"auto"}/>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        width: Dimensions.get('window').width,
        height: 200
    }
})