import React, { Component } from "react";
import { StatusBar, StyleSheet, ImageBackground, TouchableOpacity, View, Text, Image, BackHandler } from 'react-native';
import { responsiveHeight, } from "react-native-responsive-dimensions";
import { Header } from '@common';
class SocialLogin extends Component {

  render() {
    return (
      <ImageBackground source={require('@assets/bg-screen.png')} style={styles.container}>
        <StatusBar translucent={true} backgroundColor={'transparent'} />
        <Header {...this.props} />
        <View style={styles.contentContainer}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              resizeMode='contain'
              source={require('@assets/socailMedia.png')} >
            </Image>
          </View>
          <View style={styles.headingContainer}>
            <Text style={styles.headingText}>Social Media Sign In</Text>
            <Text style={styles.headingSubText}>Keep everyone connected</Text>
          </View>

          <View style={styles.platformContainer}>
            <View style={styles.platformContentContainer}>
              <TouchableOpacity style={styles.options}>
                <Image
                  style={styles.platformImage}
                  resizeMode='cover'
                  source={require('@assets/gmail.png')} >
                </Image>
              </TouchableOpacity>
              <TouchableOpacity style={styles.options}>
                <Image
                  style={styles.platformImage}
                  resizeMode='cover'
                  source={require('@assets/email.png')} >
                </Image>
              </TouchableOpacity>
              <TouchableOpacity style={styles.options}>
                <Image
                  style={styles.platformImage}
                  resizeMode='cover'
                  source={require('@assets/fb.png')} >
                </Image>
              </TouchableOpacity>
            </View>
            <View style={styles.platformContentContainer}>
              <TouchableOpacity style={styles.options}>
                <Image
                  style={styles.platformImage}
                  resizeMode='cover'
                  source={require('@assets/pinterest.png')} >
                </Image>
              </TouchableOpacity>
              <TouchableOpacity style={styles.options}>
                <Image
                  style={styles.platformImage}
                  resizeMode='cover'
                  source={require('@assets/twitter.png')} >
                </Image>
              </TouchableOpacity>
              <TouchableOpacity style={styles.options}>
                <Image
                  style={styles.platformImage}
                  resizeMode='cover'
                  source={require('@assets/outlook.png')} >
                </Image>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
export default SocialLogin

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
  },
  options: {
    height: responsiveHeight(10),
    width: responsiveHeight(10),
    backgroundColor: 'white',
    borderRadius: responsiveHeight(5),
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentContainer: {
    height: '85%',
    width: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20
  },
  imageContainer: {
    height: responsiveHeight(30),
    width: responsiveHeight(35),
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headingContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  headingText: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold'
  },
  headingSubText: {
    color: 'white',
    fontSize: 17,
  },
  platformContainer: {
    width: responsiveHeight(50),
    height: responsiveHeight(25),
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  platformImage: {
    height: '70%',
    width: '70%'
  },
  platformContentContainer: {
    flexDirection: 'row',
    width: responsiveHeight(42),
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})