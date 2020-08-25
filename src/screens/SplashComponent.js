import React, { Component } from 'react';
import {
    Animated,
    Dimensions,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View, FlatList, StatusBar, ImageBackground, TouchableNativeFeedback, Image
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import {connect} from 'react-redux';



class SplashComponent extends Component {
    constructor() {
        super();

        this.state = {
            scrollY: new Animated.Value(10)
        }
    }
    componentDidMount() {
        
        setTimeout(() => {
            this.props.navigation.navigate("modules")
        }, 3000)
    }
    render() {

        return (
            <View style={styles.container}>
                <StatusBar translucent backgroundColor="transparent" />
                <Text style={styles.headingText}>truuTalk</Text>
           
                <Image source={require('../assets/logo.png')}
                        style={{
                            width: "60%",
                            height: 200,
                            position:'absolute',
                            marginTop:60
                        }} resizeMode='cover' />


                        
                         <Text style={styles.headingSubText}>Keep the conversation going..........</Text>



            </View>
        );
    }
}


export default connect(null,{})(SplashComponent);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection:'column'
        
    },
    imgBackground: {
        width: '100%',
        height: '100%',
        flex: 1
    },
    headingText: {
        color: '#8b54ff',
        fontSize: 25,
        fontWeight: 'bold'
      },
      headingSubText: {
        color: '#8b54ff',
        fontSize: 17,
      },
});