import React, { Component } from "react";
import { StatusBar, StyleSheet, ImageBackground, TouchableOpacity, View, Text, Image, BackHandler } from 'react-native';
import { responsiveHeight, } from "react-native-responsive-dimensions";
import { Header } from '@common';
import LinearGradient from 'react-native-linear-gradient';

class SocialLogin extends Component {

  render() {
    return (
      <View  style={styles.container}>
         <LinearGradient
          start={{x: 0.0, y: 0.25}}
          end={{x: 0.5, y: 1.0}}
          locations={[0, 0.5, 0.6]}
          colors={['#8960c7','#7964d1','#656adf']}
          style={styles.imgBackground}>
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
        </LinearGradient>
      </View>
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
    backgroundColor: '#05b4ea',
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
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold'
  },
  headingSubText: {
    color: '#fff',
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
  },
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1,
    paddingTop:25
  },
})