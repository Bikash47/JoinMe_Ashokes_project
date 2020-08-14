import React, { Component } from "react";
import { StyleSheet, ScrollView, TouchableOpacity, View, ImageBackground, Text, Image, StatusBar, } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import { InputBox, Loader, ToastAlert, Header } from "@common";
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
import { connect } from "react-redux";
import { fetchUserData } from '@action';

const imageOptions = {
  title: "Select ProfilePic",
  storageOptions: {
    skipBackup: true,
    path: "images"
  },
  maxWidth: 300,
  maxHeight: 300
};
class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userImage: '',
      userName: '',
      password: '',
      phone: '',
      email: '',
      city: '',
      state: '',
      pinCode: '',
      loading: false,
      uri: ''
    };
    auth().signInAnonymously();
  }


  async register() {
    this.setState({ loading: true });
    try {
      const registerData = await auth().createUserWithEmailAndPassword(this.state.email, this.state.password);
      this.onRegister()
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        ToastAlert.show('That email address is already in use!', ToastAlert.LONG);
      }
      else if (error.code === 'auth/invalid-email') {
        ToastAlert.show('That email address is invalid!', ToastAlert.LONG);
      }
    }
  }

  addProfilePic = () => {
    ImagePicker.showImagePicker(imageOptions, (response) => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        // You can also display the image using data:
        const source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({ userImage: source, uri: 'data:image/jpeg;base64,' + response.data });
      }
    });
  }


  async onRegister() {
    const { password, userImage, userName, pinCode, city, email, userState, phone, uri } = this.state;
    const data = {
      'userName': userName,
      'password': password,
      'phone': phone,
      'email': email,
      // 'city': city,
      // 'userState': userState,
      // 'pinCode': pinCode,
      'imagePath': uri,
      'createdAt': firestore.FieldValue.serverTimestamp()
    };

    try {
      const dataRegister = await firestore().collection('Users').add(data);
      const uid = dataRegister._documentPath._parts[1];
      this.setState({ loading: false });
      this.props.fetchUserData(uid, () => { });
      ToastAlert.show("Registration Success", ToastAlert.LONG);
      AsyncStorage.setItem('@userID', uid);
      if (userImage != '') {
        this.uploadImage(uid);
      }
      this.props.navigation.navigate("Home");
    } catch (error) {

    }
  }

  render() {
    return (
      <ImageBackground source={require('@assets/bg-screen.png')} style={styles.background}>
        <StatusBar translucent={true} backgroundColor={'transparent'} />
        <Header {...this.props} />

        <View style={styles.container}>

          <View style={styles.topView}>
            <View style={styles.titleView}>
              <Text style={styles.title}>
                Register
            </Text>
            </View>

            <View style={styles.uploadView}>
              <TouchableOpacity style={styles.upload} onPress={this.addProfilePic}>
                {this.state.userImage == '' ? <Icon name="camera" type='font-awesome' size={40} color="#595959" />
                  :
                  <Image style={styles.image} resizeMode='cover' source={this.state.userImage} />}
              </TouchableOpacity>
              <Text style={{ color: 'white', }}>Upload Photo</Text>
            </View>

          </View>


          <ScrollView contentContainerStyle={styles.ScrollView}>

            <InputBox onChangeText={(text) => { this.setState({ userName: text }) }} icon={'user'} name={'UserName'} keyboardType={'default'} />

            <InputBox onChangeText={(text) => { this.setState({ password: text }) }} icon={'lock'} name={'Password'} keyboardType={'visible-password'} />

            <InputBox onChangeText={(text) => { this.setState({ phone: text }) }} icon={'mobile'} name={'Phone'} keyboardType={'numeric'} />

            <InputBox onChangeText={(text) => { this.setState({ email: text }) }} icon={'envelope-open'} name={'Email Address'} keyboardType={'email-address'} />

            {/* <InputBox onChangeText={(text) => { this.setState({ city: text }) }} icon={'address'} name={'City'} fontType={'entypo'} keyboardType={'default'} />

            <InputBox onChangeText={(text) => { this.setState({ userState: text }) }} icon={'location-pin'} name={'State'} fontType={'entypo'} keyboardType={'default'} />

            <InputBox onChangeText={(text) => { this.setState({ pinCode: text }) }} icon={'address'} name={'Zip Code'} fontType={'entypo'} keyboardType={'numeric'} />
            */}
            <Button 
              buttonStyle={styles.button}
              ComponentStyle={{ top: 10 }}
              title="Register"
              onPress={() => this.register()}
            />
          </ScrollView>


          <View style={styles.lowerView}>

            <Text style={styles.lowerViewText}>Already have a account?</Text>
            <TouchableOpacity style={styles.loginView} onPress={() => this.props.navigation.navigate("Login")}>
              <Text style={styles.login}> Login</Text>
            </TouchableOpacity>
          </View>
        </View>

        {this.state.loading && <Loader />}
      </ImageBackground>
    );
  }
}

export default connect(null, { fetchUserData })(Register);

const styles = StyleSheet.create({

  image: {
    width: 70,
    height: 70,
    borderRadius: 35
  },
  uploadView: {
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight
  },
  ScrollView: {
    height: '100%',
    width: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: 10
  },
  login: {
    color: '#5104e0',
    fontSize: 20,
    fontWeight: 'bold'
  },
  loginView: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  upload: {
    backgroundColor: 'white',
    height: 70,
    width: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleView: {
    backgroundColor: 'transparent',
    height: 100,
    alignItems: 'baseline',
    justifyContent: 'flex-end'
  },
  lowerView: {
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 40,
    backgroundColor: 'transparent'
  },
  title: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'left',
    bottom: 0
  },
  topView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 300, height: 80,
    backgroundColor: 'transparent',
  },
  container: {
    height: '90%',
    width: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20
  },

  button: {
    width: 100,
    height: 40,
    backgroundColor: '#5104e0',
    borderRadius: 5,
  },
  lowerViewText:{ color: 'white', fontSize: 15 }
})