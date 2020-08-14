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
      <View style={styles.background}>
        <Header {...this.props} />
        <View style={styles.container}>
          <View style={styles.imageView}>
            <Image
              style={styles.image}
              resizeMode='contain'
              source={require('@assets/far.png')} >
            </Image>
          </View>
          <Text style={styles.title}>
            Forget Password
            </Text>
          <View style={styles.searchSection}>
           
            <TextInput
              style={styles.input}
              placeholder="PhoneNumber/Email Id"
              onChangeText={(text) => { this.setState({ email: text }) }}
              underlineColorAndroid="transparent"
            />
            <View style={styles.searchIcon} name="microphone" type='font-awesome'
              size={30} color="#595959" />
          </View>
        
           <TouchableOpacity
            style={styles.button}
            onPress={() => this.forget()}>
            <Text style={styles.textlog}>Submit</Text>
          </TouchableOpacity>
          <View style={styles.lowerView}>
            <Text style={styles.lowerViewText}>Don’t have an account?</Text>
            <TouchableOpacity onPress={() => {
              this.props.navigation.navigate("Register")
            }} style={{ alignItems: 'center', justifyContent: 'center' }} >
              <Text style={styles.text}> Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
export default Forget

const styles = StyleSheet.create({
  title: {
    color: '#8b54ff',
    fontSize: 25,
    fontWeight: 'bold'
  },
  textlog: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
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
    height: 50,
    width: '93%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ccc',
    borderColor: '#595959',
    borderRadius: 10,
paddingLeft:10
  },
  searchIcon: {
    padding: 10,
  },
  button: {
    width: '90%',
    height: 40,
    backgroundColor: '#8b54ff',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 15,
    justifyContent: 'center',

  },
  input: {
    width: '90%',
    margin: 0,
    padding: 0,
    height: '100%',
    textAlign: 'left',
    fontSize: 20,
    backgroundColor: '#ccc',
    color: '#959595',
  },
  lowerViewText: { color: 'black', fontSize: 15 }
})