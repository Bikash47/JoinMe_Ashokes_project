import React, { Component } from "react";
import AsyncStorage from '@react-native-community/async-storage';
import { View } from 'react-native';
import SplashScreen from 'react-native-splash-screen'

import { Loader } from '@common';
import 'react-native-gesture-handler'
import { fetchUserData } from '@action'
import { connect } from "react-redux";

class modules extends Component {

    componentDidMount() { 
        this.loadApp();
        SplashScreen.hide();   
    }

    async loadApp() {
        const userSession = await AsyncStorage.getItem('@userID');
        if (userSession) {
            this.props.fetchUserData(userSession, () => { this.props.navigation.navigate('Home'); });
        } else {
            this.props.navigation.navigate('Home');
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Loader />
            </View>
        )
    }
}

export default connect(null, { fetchUserData })(modules);