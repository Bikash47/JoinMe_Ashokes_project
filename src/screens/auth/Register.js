import React, { Component } from "react";
import { StyleSheet, ScrollView, TouchableOpacity, View, ImageBackground, Text, Image, StatusBar, } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import { InputBoxRegister, Loader, ToastAlert, Header } from "@common";
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
import { connect } from "react-redux";
import { fetchUserData } from '@action';
import { ViewBase } from "react-native";

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
      // const registerData = await auth().createUserWithEmailAndPassword(this.state.email, this.state.password);
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
      'city': city,
      'userState': userState,
      'pinCode': pinCode,
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
      <View style={styles.mainView}>
        <StatusBar translucent={false} backgroundColor={'black'} />
        <ImageBackground resizeMode={'stretch'} style={styles.cornerImg} source={require("../../assets/corner.png")}>
          <View style={styles.iconst}
          >
            <Icon name="arrow-left" type='material-community' size={30} color='#fff' onPress={() => this.props.navigation.goBack()} />
          </View>

        </ImageBackground>
        {/* <Header {...this.props} /> */}
        <View style={[styles.titleView, { position: 'absolute', alignSelf: 'center', alignItems: 'center', justifyContent: 'space-evenly' }]}>

          <Text style={styles.title}>
            REGISTER
            </Text>
          <Text style={[styles.title, { fontSize: 24 }]}>
            Create Your Account
            </Text>
          <Image resizeMode={'stretch'} style={styles.txtImg} source={require("../../assets/text.png")} />


        </View>

        <View style={styles.container}>

          {/* <View style={styles.topView}> */}


          {/* <View style={styles.uploadView}>
              <TouchableOpacity style={styles.upload} onPress={this.addProfilePic}>
                {this.state.userImage == '' ? <Icon name="camera" type='font-awesome' size={40} color="#595959" />
                  :
                  <Image style={styles.image} resizeMode='cover' source={this.state.userImage} />}
              </TouchableOpacity>
              <Text style={{ color: 'white', }}>Upload Photo</Text>
            </View> */}

          {/* </View> */}


          <ScrollView contentContainerStyle={styles.ScrollView}>
            <View>
              <InputBoxRegister onChangeText={(text) => { this.setState({ userName: text }) }} icon={'user'} name={'UserName'} keyboardType={'default'} imgPos={1} />

              <InputBoxRegister onChangeText={(text) => { this.setState({ password: text }) }} icon={'lock'} name={'Password'} keyboardType={'visible-password'} imgPos={2} />

              <InputBoxRegister onChangeText={(text) => { this.setState({ phone: text }) }} icon={'mobile'} name={'Phone'} keyboardType={'numeric'} imgPos={3} />

              <InputBoxRegister onChangeText={(text) => { this.setState({ email: text }) }} icon={'envelope-open'} name={'Email Address'} keyboardType={'email-address'} imgPos={4} />

              <InputBoxRegister onChangeText={(text) => { this.setState({ city: text }) }} icon={'address'} name={'City'} fontType={'entypo'} keyboardType={'default'} imgPos={5} />

              <InputBoxRegister onChangeText={(text) => { this.setState({ userState: text }) }} icon={'location-pin'} name={'State'} fontType={'entypo'} keyboardType={'default'} imgPos={6} />

              <InputBoxRegister onChangeText={(text) => { this.setState({ pinCode: text }) }} icon={'address'} name={'Zip Code'} fontType={'entypo'} keyboardType={'numeric'} imgPos={7} />
            </View>


            {/* <Button
              buttonStyle={styles.button}
              icon
              ComponentStyle={{ top: 10 }}
              title="Register"
              onPress={() => this.register()}
            /> */}

          </ScrollView>

          <TouchableOpacity style={styles.button} onPress={() => this.register()}>
            <Image resizeMode={'stretch'} style={styles.signUpBgImg} source={require("../../assets/btnbg.png")} />

            <Text style={styles.register}> SIGNUP</Text>
          </TouchableOpacity>
          <View style={styles.lowerView}>

            <Text style={styles.lowerViewText}>Already have a account?</Text>
            <TouchableOpacity style={styles.loginView} onPress={() => this.props.navigation.navigate("Login")}>
              <Text style={styles.login}> Sign In</Text>
            </TouchableOpacity>

          </View>
          <View style={{ flexDirection: "row", alignSelf: 'center', width: 90, justifyContent: 'space-between' }}>
            <Image resizeMode={'stretch'} style={styles.socialImg} source={require("../../assets/g.png")} />
            <Image resizeMode={'stretch'} style={styles.socialImg} source={require("../../assets/f.png")} />

          </View>
        </View>


        {this.state.loading && <Loader />}
      </View>
    );
  }
}

export default connect(null, { fetchUserData })(Register);

const styles = StyleSheet.create({
  txtImg: { width: '59%', height: 15, alignSelf: 'center' },
  socialImg: { width: 40, height: 40, alignSelf: 'center', },
  mainView: {
    flex: 1, backgroundColor: '#fff'
  }, signUpBgImg: { width: '100%', height: '100%', alignSelf: 'center', position: 'absolute' },
  cornerImg: { position: 'absolute', width: 120, height: 130, top: -2, left: -3, alignItems: 'flex-start', justifyContent: 'center' },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35
  }, iconst: { width: 50, height: 50, alignItems: 'center', justifyContent: 'flex-start' },
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
    color: '#0099d4',
    fontSize: 15,
    fontWeight: 'bold'
  },
  register: {
    color: 'white',
    fontSize: 15,
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
    height: 120,
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
    color: 'black',
    fontSize: 20,
    // fontWeight: 'bold',
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
    height: '86%',
    width: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20,
    marginTop: '25%'
  },

  button: {
    width: "94%",
    height: 45,
    // backgroundColor: '#5104e0',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lowerViewText: { color: 'black', fontSize: 15 }
})