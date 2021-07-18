import React from 'react'
import { FlatList, View, Text, TouchableHighlight, StyleSheet, TextInput, Image } from 'react-native'
import { StatusBar } from 'expo-status-bar'

import IconFetcher from './Utils/IconFetcher.js'

function normalSorting(a,b)
{
    if(a["zip"] == b["zip"]) return 0
    return a["zip"] > b["zip"] ? 1 : -1
}

class ZipCodeScreen extends React.Component {

    constructor() {
        super()

        this.state = []
        this.tmpData = []
        this.getRemoteData()
    }

    static navigatorOptions = {
        title: 'Home'
    }

    getRemoteData = () => {
        fetch('https://raw.githubusercontent.com/rathpanyowat/Thai-zip-code-latitude-and-longitude/master/data.json')
        .then((response) => response.json())
        .then((json) => {

            var tdata = []
            for(let obj of json)
            {
                var isSuccess = true
                for(var remain of tdata)
                {
                    if(obj["province"] == remain["province"])
                    {
                        isSuccess = false
                        break
                    }
                }

                if(isSuccess)
                {
                    tdata.push({
                        province: obj["province"],
                        zip: obj["zip"],
                        district: obj["district"]
                    })
                }
            }
            this.setState({
                data: tdata
            })
            this.tmpData = tdata
        })
    }

    onInput = (event) => {
        if(event == "") {
            this.setState({
                data : this.tmpData.sort(normalSorting)
            })
        }
        else {
            var list = this.tmpData 
            var new_list = []
            for(let i in list)
            {
                var obj = list[i]
                if(obj["zip"].search(event) >= 0 || obj["province"].search(event) >= 0 || obj["district"].search(event) >= 0)
                {
                    new_list.push(obj)
                }
            }

            this.setState({
                data : new_list.sort(normalSorting)
            })
        }
    }

    renderNativeItem = (item) => {
        var place = item["district"] + ", " + item["province"]
        var code = item["zip"]

        return (
            <TouchableHighlight onPress={() => this.props.navigation.navigate('Weather', { zipCode: code})}>
                <View style={styles.list_card}>
                    <View style={styles.inner_card}>
                        <View style={styles.infor}>
                            <Text style={styles.place}>{place}</Text>
                            <Text style={styles.code}>{code}</Text>
                        </View>
                        <IconFetcher zipCode={code} style={styles.icon} />
                    </View>
                </View>
            </TouchableHighlight>
        )
    }

    render() {
        return (
            <View style={styles.main}>
            <StatusBar style="auto" />
            <View style={styles.input_bar}>
                <TextInput
                    style={styles.input}
                    placeholder="ค้นหาสถานที่"
                    onChangeText={this.onInput}
                />
            </View>
            <View nativeID="list" style={styles.flatlist}>
                <FlatList
                    data={this.state.data}
                    renderItem={({item}) => this.renderNativeItem(item)}
                />
            </View>
        </View>
        )
    }
}

export default ZipCodeScreen

const styles = StyleSheet.create({
    main: {
        backgroundColor: 'white'
    },
    infor: {
        width: '90%'
    },
    icon: {
        width: 64,
        height: 64
    },
    input_bar: {
        width: '100%',
        backgroundColor: '#dedede',
        height: 65,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderColor: 'gray',
        borderWidth: 2,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 100,
        height: '60%',
        width: '95%',
    },
    flatlist: {
        position: 'absolute',
        width: '100%',
        top: 65
    },
    list_card : {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        height: 90,
        backgroundColor: '#f2f2f2'
    },
    inner_card : {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        height: 70,
        flexDirection: 'row',
        borderRadius: 7,
        backgroundColor: 'white'
    },
    place: {
        textAlign: 'left',
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold'
    },
    code: {
        textAlign: 'left',
        color: '#131313'
    }
})