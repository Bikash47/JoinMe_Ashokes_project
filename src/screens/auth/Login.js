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
      <View  style={styles.background}>
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
          <Text style={styles.texts}>Email Id</Text>
            <InputBox onChangeText={(text) => { this.setState({ userID: text }) }}  name={'PhoneNumber/Email Id'} />
            <Text style={styles.texts}>Password</Text>
            <InputBox onChangeText={(text) => { this.setState({ password: text }) }}  name={'Password'} />
          </View>

          <TouchableOpacity
            style={[styles.button,this.state.userID == '' || this.state.password == ''?{backgroundColor:"#ccc"}:{backgroundColor:"#8b54ff"}]}
            onPress={() => this.login()}
            disabled={this.state.userID == '' || this.state.password == ''}
          >
            <Text style={styles.textlog}>Login</Text>
            </TouchableOpacity>
          <View style={styles.lowerview}>
            <Text style={{ color: 'black', fontSize: 15 }}>Don’t have an account?</Text>
            <TouchableOpacity style={styles.registerBtn} onPress={() => this.props.navigation.navigate("Register")}>
              <Text style={styles.register}> click here.</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.lowerviews}>
            <Text style={{ color: 'black', fontSize: 10 }}>or continue with social media</Text>
          </View>
          <View style={styles.lowerviews}>
          <Image
              style={styles.images}
              resizeMode='contain'
              source={require('@assets/google.png')} >
            </Image>
            <Image
              style={styles.images}
              resizeMode='contain'
              source={require('@assets/facebook.png')} >
            </Image>
            </View>
        </View>
        {this.state.loading && <Loader />}
      </View>
    );
  }
}

export default connect(null, { fetchUserData })(Login);

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
  },
  images: {
    height: 50,
    width: 50,
    margin:20
  },
  register: {
    color: '#5104e0', fontSize: 15, fontWeight: 'bold'
  },
  imageView: {
    height: 200,
    width: 200,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: '#8b54ff', fontSize: 35, fontWeight: 'bold'
  },
  texts: {
    color: '#000', fontSize: 15, fontWeight: 'bold'
  },
  textlog: {
    color: '#fff', fontSize: 25, fontWeight: 'bold'
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
    justifyContent: 'center'
  },
  lowerview: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 50,
    marginTop:10,
    backgroundColor: 'transparent'
  },
  lowerviews: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent'
  },
  button: {
    width: "90%",
    height: 40,
    backgroundColor: '#8b54ff',
    borderRadius: 5,
    alignItems: 'center',
    marginTop:15,
     justifyContent: 'center'
  },
  inputMainView: { height: responsiveHeight(20), justifyContent: 'space-around', paddingHorizontal: responsiveWidth(1) },
  registerBtn:{ alignItems: 'center', justifyContent: 'center',color: '#8b54ff', }
})