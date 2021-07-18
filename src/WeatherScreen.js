import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native';
import Weather from './Weather.js';
import { StatusBar } from 'expo-status-bar'
import Forecast from './Forecast.js';

export default function WeatherScreen({route}) {

    return (
        <View>
            <StatusBar style={"auto"}/>
            <Weather place={route.params.place} zipCode={route.params.zipCode} />
            <Forecast zipCode={route.params.zipCode}></Forecast>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        width: Dimensions.get('window').width,
        height: 200
    }
})