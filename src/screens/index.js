import React, { Component } from "react";
import AsyncStorage from '@react-native-community/async-storage';
import { View ,StyleSheet,Text,Image} from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import AppIntroSlider from 'react-native-app-intro-slider';
import { Icon, Button } from 'react-native-elements';

import { Loader } from '@common';
import 'react-native-gesture-handler'
import { fetchUserData } from '@action'
import { connect } from "react-redux";
const slides = [
    {
      key: 1,
      title: 'Title 1',
      text: 'Description.\nSay something cool',
      image: require('../assets/2.png'),
      backgroundColor: '#59b2ab',
    },
    {
      key: 2,
      title: 'Title 2',
      text: 'Other cool stuff',
      image: require('../assets/3.png'),
      backgroundColor: '#febe29',
    },
    
  ];
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
    // renderItem = ({ item }) => {
    //     return (
    //       <View style={styles.images}>
    //         <Image source={item.image} />
    //       </View>
    //     );
    //   }
    //   renderNextButton = () => {
    //     return (
    //       <View style={styles.buttonCircle}>
    //         <Icon
    //           name="md-arrow-round-forward"
    //           color="rgba(255, 255, 255, .9)"
    //           size={24}
    //           type='font-awesome'
    //         />
    //       </View>
    //     );
    //   };
    //   renderDoneButton = () => {
    //     return (
    //       <View style={styles.buttonCircle}>
    //         <Icon
    //           name="md-checkmark"
    //           color="rgba(255, 255, 255, .9)"
    //           size={24}
    //         />
    //       </View>
    //     );
    //   };

    render() {
        return (
            <View style={{ flex: 1 }}>
                {/* <Loader /> */}
                {/* <AppIntroSlider
                renderItem={this.renderItem} 
        data={slides}
        renderDoneButton={this.renderDoneButton}
        renderNextButton={this.renderNextButton}
      /> */}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    buttonCircle: {
      width: 40,
      height: 40,
      backgroundColor: 'rgba(0, 0, 0, .2)',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    images: {
        height: 100,
        width: 100,
       
      },
  });
export default connect(null, { fetchUserData })(modules);
