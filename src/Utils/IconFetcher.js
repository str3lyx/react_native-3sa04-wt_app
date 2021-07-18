import React from 'react'
import { Image } from 'react-native'

class IconFetcher extends React.Component {

    constructor() {

        super()
        this.state = {
            success: false,
            icon: '../../assets/na.png'
        }
    }

    getIcon = () => {
        fetch('http://api.openweathermap.org/data/2.5/weather?zip=' + this.props.zipCode + ',th&units=metric&appid=f4be18cb0f7001861ee726823440e651')
        .then((response) => response.json())
        .then((json) => {
            this.setState({
                success: true,
                icon: 'http://openweathermap.org/img/wn/' + json.weather[0].icon + '}@2x.png'
            })
        })
        .catch((error) => {
            this.setState({
                success: false,
                icon: '../../assets/na.png'
            })
        })
    }

    render(){
        this.getIcon()
        var img = this.state.success ? {uri: this.state.icon } : require('../../assets/na.png')
        return (
            <Image source={img} style={this.props.style}/>
        )
    }
}

export default IconFetcher