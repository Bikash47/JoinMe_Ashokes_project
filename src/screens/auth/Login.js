import React, { Component } from "react";
import { StyleSheet, ImageBackground, TouchableOpacity, View, Text, Image, StatusBar, } from 'react-native';
import { Button } from 'react-native-elements';
import { InputBox, Loader, ToastAlert, Header } from "@common";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from "react-redux";
import { fetchUserData } from '@action'
import auth from '@react-native-firebase/auth';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: '',
      password: ''
    };
  }

  async login() {
    this.setState({ loading: true });
    await auth()
      .signInWithEmailAndPassword(this.state.userID, this.state.password)
      .then((res) => {
        this.onSubmit()
      })
      .catch(error => {
        this.setState({ loading: false });
        ToastAlert.show('Invalid email/password !', ToastAlert.LONG);

      });
  }

  async onSubmit() {
    const { userID } = this.state;
    await firestore()
      .collection('Users')
      .where('email', '==', userID)
      .get()
      .then(querySnapshot => {
        if (querySnapshot._docs.length) {
          querySnapshot.forEach(documentSnapshot => {
            const uid = documentSnapshot.id;
            this.props.fetchUserData(uid, () => { });
            this.setState({ loading: false });
            ToastAlert.show("Welcome !", ToastAlert.LONG);
            AsyncStorage.setItem('@userID', uid);
            this.props.navigation.navigate("Home");
          });
        } else {
          this.setState({ loading: false });
          ToastAlert.show("Invalid email/password !", ToastAlert.LONG);
        }
      }).catch(error => {
        this.setState({ loading: false });
        ToastAlert.show("Invalid email/password !", ToastAlert.LONG);
      });
  }

  render() {
    return (
      <ImageBackground source={require('@assets/bg-screen.png')} style={styles.background}>
        <StatusBar translucent={true} backgroundColor={'transparent'} />
        <Header {...this.props} />

        <View style={styles.container}>
          <View style={styles.imageView}>
            <Image
              style={styles.image}
              resizeMode='contain'
              source={require('@assets/forget-pass.png')} >
            </Image>
          </View>
          <Text style={styles.text}>Login</Text>

          <View style={styles.inputMainView}>
            <InputBox onChangeText={(text) => { this.setState({ userID: text }) }} icon={'user'} name={'PhoneNumber/Email Id'} />
            <InputBox onChangeText={(text) => { this.setState({ password: text }) }} icon={'lock'} name={'Password'} />
          </View>

          <Button
            buttonStyle={styles.button}
            title="Login"
            onPress={() => this.login()}
            disabled={this.state.userID == '' || this.state.password == ''}
          />
          <View style={styles.lowerview}>
            <Text style={{ color: 'white', fontSize: 15 }}>Don’t have an account?</Text>
            <TouchableOpacity style={styles.registerBtn} onPress={() => this.props.navigation.navigate("Register")}>
              <Text style={styles.register}> Register</Text>
            </TouchableOpacity>
          </View>
        </View>
        {this.state.loading && <Loader />}
      </ImageBackground>
    );
  }
}

export default connect(null, { fetchUserData })(Login);

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
  },
  register: {
    color: '#5104e0', fontSize: 20, fontWeight: 'bold'
  },
  imageView: {
    height: 200,
    width: 250,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: 'white', fontSize: 25, fontWeight: 'bold'
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight
  },
  container: {
    height: '90%',
    paddingTop: 20,
    width: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  lowerview: {
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 50,
    backgroundColor: 'transparent'
  },
  button: {
    width: 100,
    height: 40,
    backgroundColor: '#5104e0',
    borderRadius: 5,
  },
  inputMainView: { height: responsiveHeight(20), justifyContent: 'space-around', paddingHorizontal: responsiveWidth(1) },
  registerBtn:{ alignItems: 'center', justifyContent: 'center' }
})