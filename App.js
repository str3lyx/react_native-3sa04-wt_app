import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Weather from './Components/Weather.js'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ZipCodeScreen from './Components/ZipCodeScreen.js';

const Stack = createStackNavigator();

export default function App() {
    return ( 
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={ZipCodeScreen} />
            </Stack.Navigator>
        </NavigationContainer> 
    )
}

/*
export default function App() {
    const doIt = () => {
        console.log("Hello from console")
    }
    
    return (
        <View style={styles.container}>
            <Weather zipCode="92000"></Weather>
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
*/