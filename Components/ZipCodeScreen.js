import React from 'react'
import { FlatList, View, Text, TouchableHighlight, StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import { Directions } from 'react-native-gesture-handler'

const availableZipItems = [
    { place: 'Hatyai', code: '90110' },
    { place: 'Trang', code: '92000' },
    { place: 'Chiangmai', code: '50000' },
    { place: 'Khonkaen', code: '40000' },
    { place: 'Chonburi', code: '20000' }
]

const ZipItem = ({place, code, navigation}) => (
    <TouchableHighlight onPress={() => navigation.navigate('Weather', { zipCode: code})}>
        <View style={styles.list_card}>
            <Text style={styles.place}>{place}</Text>
            <Text style={styles.code}>{code}</Text>
        </View>
    </TouchableHighlight>
)

const _keyExtractor = item => item.code

export default function ZipCodeScreen(){
    const navigation = useNavigation()
    return (
        <View>
            <FlatList
                data={availableZipItems}
                keyExtractor={_keyExtractor}
                renderItem={({item}) => <ZipItem {...item} navigation={navigation} />}
            />
            <StatusBar style="auto" />
        </View>
    );    
}

const styles = StyleSheet.create({
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