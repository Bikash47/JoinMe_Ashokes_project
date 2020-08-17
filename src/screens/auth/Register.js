import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  ImageBackground,
  Text,
  Image,
  StatusBar,
} from 'react-native';
import {Icon, Button} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import {InputBox, Loader, ToastAlert, Header} from '@common';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
import {connect} from 'react-redux';
import {fetchUserData} from '@action';

const imageOptions = {
  title: 'Select ProfilePic',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
  maxWidth: 300,
  maxHeight: 300,
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
      uri: '',
    };
    auth().signInAnonymously();
  }

  async register() {
    this.setState({loading: true});
    try {
      const registerData = await auth().createUserWithEmailAndPassword(
        this.state.email,
        this.state.password,
      );
      this.onRegister();
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

  addProfilePic = () => {
    ImagePicker.showImagePicker(imageOptions, (response) => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        // You can also display the image using data:
        const source = {uri: 'data:image/jpeg;base64,' + response.data};
        this.setState({
          userImage: source,
          uri: 'data:image/jpeg;base64,' + response.data,
        });
      }
    });
  };

  async onRegister() {
    const {
      password,
      userImage,
      userName,
      pinCode,
      city,
      email,
      userState,
      phone,
      uri,
    } = this.state;
    const data = {
      userName: userName,
      password: password,
      phone: phone,
      email: email,
      city: city,
      userState: userState,
      pinCode: pinCode,
      imagePath: uri,
      createdAt: firestore.FieldValue.serverTimestamp(),
    };

    try {
      const dataRegister = await firestore().collection('Users').add(data);
      const uid = dataRegister._documentPath._parts[1];
      this.setState({loading: false});
      this.props.fetchUserData(uid, () => {});
      ToastAlert.show('Registration Success', ToastAlert.LONG);
      AsyncStorage.setItem('@userID', uid);
      if (userImage != '') {
        this.uploadImage(uid);
      }
      this.props.navigation.navigate('Home');
    } catch (error) {}
  }

  render() {
    return (
      <View style={styles.background}>
        <StatusBar translucent={true} backgroundColor={'transparent'} />
        {/* <Header {...this.props} /> */}

        <View style={styles.container}>
          <View style={styles.topView}>
            <View style={styles.titleView}>
              <Image
                style={styles.images}
                resizeMode="contain"
                source={require('@assets/logo.png')}
              />
              <Text style={{color: 'black', fontSize: 20}}>Welcome.</Text>
            </View>

            <View style={styles.uploadView}>
              <TouchableOpacity
                style={styles.upload}
                onPress={this.addProfilePic}>
                {this.state.userImage == '' ? (
                  <Icon
                    name="camera"
                    type="font-awesome"
                    size={40}
                    color="#595959"
                  />
                ) : (
                  <Image
                    style={styles.image}
                    resizeMode="cover"
                    source={this.state.userImage}
                  />
                )}
              </TouchableOpacity>
              {/* <Text style={{ color: 'white', }}>Upload Photo</Text> */}
            </View>
          </View>

          <ScrollView contentContainerStyle={styles.ScrollView}>
            <Text style={styles.texts}>User Name</Text>
            <InputBox
              onChangeText={(text) => {
                this.setState({userName: text});
              }}
              name={'Enter Full Name'}
              keyboardType={'default'}
            />
            <Text style={styles.texts}>Password</Text>
            <InputBox
              onChangeText={(text) => {
                this.setState({password: text});
              }}
              name={'Enter YourPassword'}
              keyboardType={'visible-password'}
            />
            <Text style={styles.texts}>Phone Number</Text>
            <InputBox
              onChangeText={(text) => {
                this.setState({phone: text});
              }}
              name={'Enter Your Phone'}
              keyboardType={'numeric'}
            />
            <Text style={styles.texts}>Email Adress</Text>
            <InputBox
              onChangeText={(text) => {
                this.setState({email: text});
              }}
              name={'Enter Your Email Address'}
              keyboardType={'email-address'}
            />
            <Text style={styles.texts}>City</Text>
            <InputBox
              onChangeText={(text) => {
                this.setState({city: text});
              }}
              name={'Enter Your City'}
              fontType={'entypo'}
              keyboardType={'default'}
            />
            <Text style={styles.texts}>State</Text>
            <InputBox
              onChangeText={(text) => {
                this.setState({userState: text});
              }}
              name={'Enter Your State'}
              fontType={'entypo'}
              keyboardType={'default'}
            />
            <Text style={styles.texts}>Zip Code</Text>
            <InputBox
              onChangeText={(text) => {
                this.setState({pinCode: text});
              }}
              name={'Enter Your Zip Code'}
              fontType={'entypo'}
              keyboardType={'numeric'}
            />
          </ScrollView>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.register()}>
            <Text style={styles.textlog}>Register</Text>
          </TouchableOpacity>
          <View style={styles.lowerview}>
            <Text style={{color: 'black', fontSize: 15}}>
              Already have a account?
            </Text>
            <TouchableOpacity
              style={styles.registerBtn}
              onPress={() => this.props.navigation.navigate('Login')}>
              <Text style={styles.register}> click here.</Text>
            </TouchableOpacity>
          </View>
          {/* <View style={styles.lowerviews}>
             <Text style={{ color: 'black', fontSize: 10 }}>or continue with social media</Text> 
          </View> */}
          {/* <View style={styles.lowerviews}>
          <Image
              style={styles.imags}
              resizeMode='contain'
              source={require('@assets/google.png')} >
            </Image>
            <Image
              style={styles.imags}
              resizeMode='contain'
              source={require('@assets/facebook.png')} >
            </Image>
            </View> */}
        </View>

        {this.state.loading && <Loader />}
      </View>
    );
  }
}

export default connect(null, {fetchUserData})(Register);

const styles = StyleSheet.create({
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  texts: {
    color: '#000',
    fontSize: 15,
    fontWeight: 'bold',
    margin: 10,
  },
  textlog: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
  },
  images: {
    width: 80,
    height: 80,
  },
  imags: {
    height: 50,
    width: 50,
    margin: 20,
  },
  uploadView: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight,
  },
  ScrollView: {
    height: '100%',
    width: '100%',
    backgroundColor: 'transparent',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  login: {
    color: '#5104e0',
    fontSize: 20,
    fontWeight: 'bold',
  },
  loginView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  upload: {
    backgroundColor: 'white',
    height: 70,
    width: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleView: {
    backgroundColor: 'transparent',
    height: 100,
    alignItems: 'baseline',
    justifyContent: 'flex-end',
  },
  lowerview: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 50,
    marginTop: 10,
    backgroundColor: 'transparent',
  },
  lowerviews: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  title: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'left',
    bottom: 0,
  },
  topView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 300,
    height: 80,
    marginBottom: 10,
    backgroundColor: 'transparent',
  },
  container: {
    height: '90%',
    paddingTop: 20,
    width: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
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
  lowerViewText: {color: 'white', fontSize: 15},
});
