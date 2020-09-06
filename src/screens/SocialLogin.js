import React, { Component } from "react";
import { StatusBar, StyleSheet, ImageBackground, TouchableOpacity, View, Text, Image, Alert } from 'react-native';
import { responsiveHeight, } from "react-native-responsive-dimensions";
import {InputBox, Loader, ToastAlert, Header} from '@common';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import auth from '@react-native-firebase/auth';
import {fetchUserData} from '@action';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';

class SocialLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pushData: [],
      loggedIn: false,
      userInfo:''
    }
    auth().signInAnonymously();
  }

  componentDidMount() {
    GoogleSignin.configure();
  }

  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({ userInfo });
      console.log("LoginSucess: " + JSON.stringify(userInfo));
      let params = {
        login_by: "google",
        name: userInfo.user.name,
        email: userInfo.user.email,
        phone: "",
        social_id: userInfo.user.id,
        photo:userInfo.user.photo
      }
      this.register(userInfo)
           // Alert.alert("Google Login Success", "Login ID : " + userInfo.user.email)

    } catch (error) {
      console.log("Loginfailerror: " + error);
      alert("Something went wrong, Please try again later.")
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  async register(params) {
    this.setState({loading: true});
    try {
      const registerData = await auth().createUserWithEmailAndPassword(
        params.user.email,
        "google"
      );
      this.onRegister(params);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        ToastAlert.show(
          'That email address is already in use!',
          ToastAlert.LONG,
        );
      } else if (error.code === 'auth/invalid-email') {
        ToastAlert.show('That email address is invalid!', ToastAlert.LONG);
      }
    }
  }
  async onRegister(registerdatar) {

    const data = {
      userName: registerdatar.user.name,
      password: "google",
      phone: "",
      email: registerdatar.user.email,
      social_id:registerdatar.user.id,
      imagePath: registerdatar.user.photo,
      createdAt: firestore.FieldValue.serverTimestamp(),
    };

    try {
      const dataRegister = await firestore().collection('Users').add(data);
      const uid = dataRegister._documentPath._parts[1];
      this.setState({loading: false});
      this.props.fetchUserData(uid, () => {});
      ToastAlert.show('Registration Success', ToastAlert.LONG);
      AsyncStorage.setItem('@userID', uid);
      // if (userImage != '') {
      //   this.uploadImage(uid);
      // }
      this.props.navigation.navigate('Home');
    } catch (error) {}
  }
  render() {
    return (
      <View  style={styles.container}>
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
              <TouchableOpacity style={styles.options}
                            onPress={this.signIn}
                            >
                <Image
                  style={styles.platformImage}
                  resizeMode='cover'
                  source={require('@assets/gmail.png')} >
                </Image>
              </TouchableOpacity>
              <GoogleSigninButton
              style={{ width: "0%", height: 0 }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={this.signIn}
              disabled={this.state.isSigninInProgress} />
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
        {this.state.loading && <Loader />}
      </View>
    );
  }
}
export default connect(null, {fetchUserData})(SocialLogin);

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
  },
  options: {
    height: responsiveHeight(10),
    width: responsiveHeight(10),
    backgroundColor: '#8b54ff',
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
    color: '#8b54ff',
    fontSize: 25,
    fontWeight: 'bold'
  },
  headingSubText: {
    color: '#8b54ff',
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