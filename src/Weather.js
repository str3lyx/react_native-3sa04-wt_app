import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, View, Image, ImageBackground } from 'react-native';

import { DateTime } from './Utils/DateTime.js'

export default function Weather(props) {
    const [forecastInfo, setForecastInfo] = useState({
        description: 'ไม่สามารถเข้าถึงข้อมูลได้',
        temp: 'N/A',
        feel: 'N/A',
        icon: '-1'
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

    var img = forecastInfo.icon == '-1' ? require('../assets/na.png') : {uri:`http://openweathermap.org/img/wn/${forecastInfo.icon}@2x.png`}
    var d = new Date().getHours()
    var sky = d >=6 && d < 18 ? 'https://images.financialexpress.com/2020/04/sky1200.jpg?w=1200&h=800&imflag=true' : 'https://img.freepik.com/free-photo/sky-astrology-cosmos-galaxy-starry_53876-31009.jpg?size=626&ext=jpg'
    if(d >= 17 && d < 19)
        sky = 'https://www.teahub.io/photos/full/121-1213644_photo-wallpaper-dark-twilight-sky-nature-sunset-sunset.jpg'
    else if(d >= 5 && d < 6)
        sky = 'https://thumbs.dreamstime.com/b/clear-sunset-sky-view-94428312.jpg'
    return (
        <View style={styles.wea}>
            <ImageBackground source={{uri: sky}} style={styles.black_bar}>
                <Text style={styles.des_text}>{props.place}</Text>
                <View style={styles.tab}>
                    <View style={styles.left}>
                        <Text style={styles.date}>{DateTime()}</Text>
                        <View style={styles.temperature}>
                            <Text style={styles.number}>{forecastInfo.temp}</Text>
                            <Text style={styles.text}>°C</Text>
                        </View>
                        <Text style={styles.des_text}>อุณหภูมิที่รู้สึก {forecastInfo.feel} °C</Text>
                    </View>
                    <View style={styles.right}>
                        <Image source={img} style={styles.icon} />
                        <Text style={styles.description}>{forecastInfo.description}</Text>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    wea: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '100%'
    },
    black_bar: {
        width: '100%',
        height: 480,
        paddingTop: 15
    },
    left: {
        width:  '60%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-end'
    },
    right: {
        width: '30%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    tab: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    icon: {
        width: 96,
        height: 96
    },
    temperature: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
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
        width: '50%',
        textAlign: 'center'
    },
    date: {
        marginBottom: -15,
        color: 'white'
    }
})