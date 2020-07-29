/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from "react";
import {
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  View,
  TextInput,
  Text,
  Image,
} from 'react-native';
import { Icon, Button } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import { ToastAlert, Header } from "@common";

class Forget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };
  }

  forget() {
    var emailAddress = this.state.email;
    auth().sendPasswordResetEmail(emailAddress).then(() => {
      ToastAlert.show("Reset Link Sent to your Email", ToastAlert.LONG);
    }).catch((error) => {
      ToastAlert.show("Invalid Email", ToastAlert.LONG);
    });
  }
  render() {
    return (
      <ImageBackground source={require('@assets/bg-screen.png')} style={styles.background}>
        <Header {...this.props} />
        <View style={styles.container}>
          <View style={styles.imageView}>
            <Image
              style={styles.image}
              resizeMode='contain'
              source={require('@assets/forget-pass.png')} >
            </Image>
          </View>
          <Text style={styles.title}>
            Forget Password
            </Text>
          <View style={styles.searchSection}>
            <Icon style={styles.searchIcon} name="user" type='font-awesome'
              size={25} color="#595959" />
            <TextInput
              style={styles.input}
              placeholder="PhoneNumber/Email Id"
              onChangeText={(text) => { this.setState({ email: text }) }}
              underlineColorAndroid="transparent"
            />
            <View style={styles.searchIcon} name="microphone" type='font-awesome'
              size={30} color="#595959" />
          </View>
          <Button
            buttonStyle={styles.button}
            title="Submit"
            onPress={() => this.forget()}
            disabled={this.state.email == '' || this.state.pass == ''}
          />
          <View style={styles.lowerView}>
            <Text style={styles.lowerViewText}>Don’t have an account?</Text>
            <TouchableOpacity onPress={() => {
              this.props.navigation.navigate("Register")
            }} style={{ alignItems: 'center', justifyContent: 'center' }} >
              <Text style={styles.text}> Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
export default Forget

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold'
  },
  lowerView: {
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 50,
    backgroundColor: 'transparent'
  },
  image: {
    height: '100%',
    width: '100%',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageView: {
    height: 200,
    width: 250,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    height: '85%',
    width: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20
  },
  text: {
    color: '#5104e0',
    fontSize: 20,
    fontWeight: 'bold'
  },
  searchSection: {
    height: 45,
    width: '93%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#595959',
    borderRadius: 30
  },
  searchIcon: {
    padding: 10,
  },
  button: {
    width: 100,
    height: 40,
    backgroundColor: '#5104e0',
    borderRadius: 5,

  },
  input: {
    width: '70%',
    margin: 0,
    padding: 0,
    height: '100%',
    textAlign: 'left',
    fontSize: 20,
    backgroundColor: '#fff',
    color: '#959595',
  },
  lowerViewText: { color: 'white', fontSize: 15 }
})