import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native';

export default function Forecast(props) {
    const [forecastInfo, setForecastInfo] = useState({
        wind: {
            speed: 0,
            deg: 0
        },
        pressure: 100,
        humid: 60
    })

    useEffect(() => {
        console.log(`fetching data with zipCode = ${props.zipCode}`)
        if (props.zipCode) {
            fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${props.zipCode},th&units=metric&appid=f4be18cb0f7001861ee726823440e651`)
            .then((response) => response.json())
            .then((json) => {
                setForecastInfo({
                    wind: {
                        speed: json.wind.speed,
                        deg: json.wind.deg
                    },
                    humid: json.main.humidity,
                    pressure: json.main.pressure
                });
                console.log(json)
            })
            .catch((error) => {
                console.warn(error);
            });
        }
    }, [props.zipCode])

    return (
        <View style={styles.forecast}>
            <View style={styles.row}>
                <View style={styles.wind_col}>
                    <View style={styles.cell}>
                        <Text>ทิศทางลม: {forecastInfo.wind.deg}° จากทิศเหนือ</Text>
                        <Text>ความเร็วลม: {forecastInfo.wind.speed} m/s</Text>
                    </View>
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.col}>
                    <View style={styles.cell}>
                        <Text>ความชื้น: {forecastInfo.humid}% </Text>
                    </View>
                </View>
                <View style={styles.col}>
                    <View style={styles.cell}>
                        <Text>ความดันบรรยากาศ: {Math.round(forecastInfo.pressure * 0.986923 ) / 1000} atm</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    forecast: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '100%'
    },
    row: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#dedede'
    },
    col: {
        padding: 6,
        width: '50%',
        height: 70,
        borderRadius: 7
    },
    wind_col: {
        padding: 6,
        width: '100%',
        height: 70,
        borderRadius: 7
    },
    cell: {
        borderRadius: 7,
        height: 60,
        width: '100%',
        backgroundColor: 'white',
        justifyContent: 'center',
        padding: 5,
        paddingLeft: 8,
        paddingRight: 8
    }
})