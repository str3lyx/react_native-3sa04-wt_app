import React, { useState } from 'react'
import { FlatList, View, Text, TouchableHighlight, StyleSheet, TextInput } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import Location from './Location.json'

const ZipItem = ({place, code, navigation}) => (
    <TouchableHighlight onPress={() => navigation.navigate('Weather', { zipCode: code})}>
        <View style={styles.list_card}>
            <Text style={styles.place}>{place}</Text>
            <Text style={styles.code}>{code}</Text>
        </View>
    </TouchableHighlight>
)

const _keyExtractor = item => item.zip

export default function ZipCodeScreen(){
    var savedData = [
        {
            "province": "Trang",
            "zip": "92000"
        }
    ]
    const getData = (country) => {
        var json = JSON.parse(JSON.stringify(Location))
        return json
    }
    const [data, setData] = useState(savedData)
    const navigation = useNavigation()

    const onFocus = () => {
        setData(getData().sort(function(a,b){
            if(a["province"].toUpperCase() == b["province"].toUpperCase())
                return 0;
            return a["province"].toUpperCase() > b["province"].toUpperCase() ? 1 : -1
        }))
    }

    const onBlur = () => {
        setData(savedData)
    }

    const onInput = (event) => {
        console.log(event)
        if(event == "") {
            onFocus()
        }
        else {
            var list = getData()
            var new_list = []
            for(let i in list)
            {
                var obj = list[i]
                if(obj["province"].toUpperCase().search(event.toUpperCase()) == 0)
                {
                    new_list.push(obj)
                }
            }

            setData(new_list.sort(function(a,b){
                if(a["province"].toUpperCase() == b["province"].toUpperCase())
                    return 0;
                return a["province"].toUpperCase() > b["province"].toUpperCase() ? 1 : -1
            }))
        }
    }

    return (
        <View>
            <StatusBar style="auto" />
            <View nativeID="list">
                <FlatList
                    data={data}
                    keyExtractor={_keyExtractor}
                    renderItem={({item}) => <ZipItem place={item.province} code={item.zip} navigation={navigation} />}
                />
            </View>
            <View style={styles.input_bar}>
                <TextInput
                    style={styles.input}
                    placeholder="ค้นหาสถานที่"
                    clearTextOnFocus={true}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChangeText={onInput}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input_bar: {
        width: '100%',
        backgroundColor: '#dedede',
        height: '10%',
        position: 'fixed',
        top: '90%',
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
        wordWrap: 'break-word',
        wordBreak: 'break-all',
        borderRadius: '100px',
        height: '60%',
        width: '95%',
    },
    list_card : {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        height: '50px',
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