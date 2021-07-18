import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, View, Image } from 'react-native';

import { DateTime } from './Utils/DateTime.js'

export default function Weather(props) {
    const [forecastInfo, setForecastInfo] = useState({
        description: '-',
        temp: 0,
        feel: 0,
        icon: '10d'
    })

    useEffect(() => {
        console.log(`fetching data with zipCode = ${props.zipCode}`)
        if (props.zipCode) {
            fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${props.zipCode},th&units=metric&appid=f4be18cb0f7001861ee726823440e651`)
            .then((response) => response.json())
            .then((json) => {
                setForecastInfo({
                    description: json.weather[0].description,
                    temp: Math.round(json.main.temp),
                    feel: Math.round(json.main.feels_like),
                    icon: json.weather[0].icon
                });
                console.log(json)
            })
            .catch((error) => {
                console.warn(error);
            });
        }
    }, [props.zipCode])

    return (
        <View style={styles.black_bar}>
            <Text style={styles.date}>{DateTime()}</Text>
            <View style={styles.tabTemp}>
                <View style={styles.temperature}>
                    <Text style={styles.number}>{forecastInfo.temp}</Text>
                    <Text style={styles.text}>°C</Text>
                </View>
                <View>
                    <Image source={{uri:`http://openweathermap.org/img/wn/${forecastInfo.icon}@2x.png`}} style={styles.icon} />
                </View>
            </View>
            <View style={styles.tab}>
                <Text style={styles.des_text}>อุณหภูมิที่รู้สึก {forecastInfo.feel} °C</Text>
                <Text style={styles.description}>{forecastInfo.description}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    black_bar: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: '100%',
        height: 480,
        padding: 24
    },
    tab: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    },
    tabTemp: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%'
    },
    icon: {
        width: 96,
        height: 96
    },
    temperature: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '70%'
    },
    number: {
        color: 'white',
        fontSize: 72
    },
    des_text: {
        marginTop: -10,
        color: 'white',
        textAlign: 'left',
        width: '50%'
    },
    text: {
        color: 'white',
        marginLeft: 5,
        marginRight: 5
    },
    zip: {
        color: '#ffffff'
    },
    description: {
        marginTop: -10,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'right',
        width: '50%'
    },
    date: {
        marginBottom: -15,
        color: 'white'
    }
})