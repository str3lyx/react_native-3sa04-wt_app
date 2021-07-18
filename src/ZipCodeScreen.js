import React, { useState } from 'react'
import { FlatList, View, Text, TouchableHighlight, StyleSheet, TextInput } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import Location from '../assets/locations.json'

const ZipItem = ({province, district, code, navigation}) => (
    <TouchableHighlight onPress={() => navigation.navigate('Weather', { zipCode: code, place: district + ", " + province })}>
        <View style={styles.list_card}>
            <Text style={styles.place}>{district + ", " + province}</Text>
            <Text style={styles.code}>{code}</Text>
        </View>
    </TouchableHighlight>
)

const _keyExtractor = item => item.zip

export default function ZipCodeScreen(){
    const getData = () => {
        var json = JSON.parse(JSON.stringify(Location))
        var savedData = []
        for(var obj of json)
        {
            var success = true
            for(var re of savedData)
            {
                if(re["zip"] == obj["zip"])
                {
                    success = false
                    break;
                }
            }

            if(success)
            {
                savedData.push(obj)
            }

        }
        return savedData
    }
    const [data, setData] = useState(getData())
    const navigation = useNavigation()

    const onInput = (event) => {
        console.log(event)
        if(event == "") {
            setData(getData().sort(function(a,b){
                if(a["zip"] == b["zip"])
                    return 0;
                return a["zip"] > b["zip"] ? 1 : -1
            }))
        }
        else {
            var list = getData()
            var new_list = []
            for(let i in list)
            {
                var obj = list[i]
                if(obj["province"].search(event) >= 0 || obj["district"].search(event) >= 0 || obj["zip"].search(event) >= 0)
                {
                    new_list.push(obj)
                }
            }

            setData(new_list.sort(function(a,b){
                if(a["zip"] == b["zip"])
                    return 0;
                return a["zip"] > b["zip"] ? 1 : -1
            }))
        }
    }

    return (
        <View>
            <StatusBar style="auto" />
            <View style={styles.input_bar}>
                <TextInput
                    style={styles.input}
                    placeholder="ค้นหาสถานที่"
                    onChangeText={onInput}
                />
            </View>
            <View nativeID="list">
                <FlatList
                    data={data}
                    keyExtractor={_keyExtractor}
                    renderItem={({item}) => <ZipItem province={item.province} district={item.district} code={item.zip} navigation={navigation} />}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input_bar: {
        width: '100%',
        backgroundColor: '#dedede',
        height: 65,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderColor: 'gray',
        borderWidth: 2,
        paddingLeft: '1%',
        paddingRight: '1%',
        borderRadius: 100,
        height: '60%',
        width: '95%',
    },
    list_card : {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        height: 50,
        flexDirection: 'row'
    },
    place: {
        width: '50%',
        textAlign: 'left'
    },
    code: {
        width: '50%',
        textAlign: 'right',
        color: '#131313'
    }
}) 