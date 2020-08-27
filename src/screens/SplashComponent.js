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
import LinearGradient from 'react-native-linear-gradient';

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
               
            <LinearGradient
          start={{x: 0.0, y: 0.25}}
          end={{x: 0.5, y: 1.0}}
          locations={[0, 0.5, 0.6]}
          colors={['#8960c7','#7964d1','#656adf']}
          style={styles.imgBackground}>
               <Text style={styles.headingText}>TELEREFRENCE</Text>
               {/* <Text style={styles.headingSubText}>Keep the conversation going..........</Text> */}
                <Image source={require('../assets/logo.png')}
                        style={{
                            width: "60%",
                            height: 200,
                            position:'absolute',
                            marginTop:30
                        }} resizeMode='cover' />
                        


</LinearGradient>
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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection:'column'
    },
    headingText: {
        color: 'transparent',
        fontSize: 25,
        fontWeight: 'bold'
      },
      headingSubText: {
        color: '#fff',
        fontSize: 17,
      },
     
});