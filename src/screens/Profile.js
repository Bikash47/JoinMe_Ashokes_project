import React, { Component } from "react";
import { StyleSheet, ImageBackground, TouchableOpacity, View, Text, Image } from 'react-native';
import { Icon, } from 'react-native-elements';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import { connect } from "react-redux";
import AsyncStorage from '@react-native-community/async-storage';
import { resetData } from '@action';
import LinearGradient from 'react-native-linear-gradient';

class Profile extends Component {

  validateINfo(data) {
    const DataInfo = data ? data : 'No info available';
    return DataInfo;
  }

  async logout() {
    AsyncStorage.clear();
    this.props.navigation.navigate('Home');
    this.props.resetData()
  }
 
  render() {
    const { getUserProfile, userImagePath } = this.props;
    if (this.props.getUserProfile == null) {
      return null;
    }

    return (
      <View  style={styles.container}>
        <LinearGradient
          start={{x: 0.0, y: 0.25}}
          end={{x: 0.5, y: 1.0}}
          locations={[0, 0.5, 0.6]}
          colors={['#8960c7','#7964d1','#656adf']}
          style={styles.imgBackground}>
        <View style={styles.userInfoContainer}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.userImage}
              resizeMode='cover'
              source={userImagePath ? { uri: userImagePath } : require('@assets/profile2.png')}  >
            </Image>
          </View>
          <View style={styles.userLoginInfo}>
            <Text style={styles.userLoginInfoText1}>{getUserProfile.userName}</Text>
            <Text style={styles.userLoginInfoText2}>{getUserProfile.email}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Home")}
          style={styles.navController}
        >
          <Icon name="arrow-left-thick" type='material-community' size={25} color="white" />
          <Text style={styles.navText}>Back To Home</Text>
        </TouchableOpacity>
        <View style={styles.accountInfoContainer}>
          <Text style={styles.accountInfoHead}>Account Info</Text>
          <View style={styles.detailsContainer}>
            <View style={styles.searchSection}>
              <Icon name="user" type='font-awesome' size={20} color="white" />
              <View style={styles.textParentView}>
                <Text style={styles.infoText}>Full Name</Text>
                <Text style={styles.infoText}>{this.validateINfo(getUserProfile.userName)}</Text>
              </View>
              {/* <Icon name="edit" type='font-awesome'
                size={20} color="#8b54ff" /> */}
            </View>
            <View style={styles.searchSection}>
              <Icon name="mobile" type='font-awesome'  size={20} color="white" />
              <View style={styles.textParentView}>
                <Text style={styles.infoText}>Phone</Text>
                <Text style={styles.infoText}>{this.validateINfo(getUserProfile.phone)}</Text>
              </View>
              {/* <Icon name="edit" type='font-awesome' size={20} color="#8b54ff" /> */}
            </View>

            <View style={styles.searchSection}>
              <Icon name="envelope-open" type='font-awesome'
                size={15} color="white" />
              <View style={styles.textParentView}>
                <Text style={styles.infoText}>Email Address</Text>
                <Text style={styles.infoText}>{this.validateINfo(getUserProfile.email)}</Text>
              </View>
              {/* <Icon name="edit" type='font-awesome' size={20} color="#8b54ff" /> */}
            </View>

            <View style={styles.searchSection}>
              <Icon name="address" type='entypo'
                size={20} color="white" />
              <View style={styles.textParentView}>
                <Text style={styles.infoText}>City</Text>
                <Text style={styles.infoText}>{this.validateINfo(getUserProfile.city)}</Text>
              </View>
              {/* <Icon name="edit" type='font-awesome' size={20} color="#8b54ff" /> */}
            </View>

            <View style={styles.searchSection}>
              <Icon name="location-pin" type='entypo'
                size={20} color="white" />
              <View style={styles.textParentView}>
                <Text style={styles.infoText}>State</Text>
                <Text style={styles.infoText}>{this.validateINfo(getUserProfile.userState)}</Text>
              </View>
              {/* <Icon name="edit" type='font-awesome' size={20} color="#8b54ff" /> */}
            </View>

            <View style={styles.searchSection}>
              <Icon name="address" type='entypo'
                size={20} color="white" />
              <View style={styles.textParentView}>
                <Text style={styles.infoText}>Zip Code</Text>
                <Text style={styles.infoText}>{this.validateINfo(getUserProfile.pinCode)}</Text>
              </View>
              {/* <Icon name="edit" type='font-awesome' size={20} color="#8b54ff" /> */}
            </View>
            <TouchableOpacity
              onPress={() => { this.logout() }}
              style={styles.buttonContainer}>
              <Text style={styles.logOutText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
        </LinearGradient>
      </View>
    );
  }
}

const mapStateToProps = ({ utils }) => {
  const { getUserProfile, userImagePath } = utils;
  return { getUserProfile, userImagePath };
};

export default connect(mapStateToProps, { resetData })(Profile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  searchSection: {
    height: 50,
    width: '93%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderColor: '#8b54ff',
    borderRadius: 30
  },
  userInfoContainer: {
    top: responsiveHeight(2),
    height: '30%',
    width: '100%',
    zIndex: 100,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  imageContainer: {
    height: responsiveWidth(30),
    width: responsiveWidth(30),
    backgroundColor: '#8b54ff',
    borderRadius: responsiveWidth(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  userImage: {
    height: responsiveWidth(28),
    width: responsiveWidth(28),
    overflow: 'hidden',
    borderRadius: responsiveWidth(14),
  },
  userLoginInfo: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  navController: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#5b19ea',
    height: responsiveHeight(6),
    width: responsiveWidth(90),
    borderRadius: 30,
    top: responsiveHeight(2),
    left:15
  },
  navText: {
    color: '#fff',
    fontSize: responsiveFontSize(2.5),
    fontWeight: '400',
    right: responsiveWidth(8)
  },
  accountInfoContainer: {
    height: '85%',
    width: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20
  },
  accountInfoHead: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    width: '100%'
  },
  detailsContainer: {
    width: responsiveHeight(45),
    height: responsiveHeight(75),
    alignItems: 'center',
  },
  infoText:{ 
    color: 'white', 
    fontSize: 15, 
    fontWeight: '400' 
  },
  buttonContainer:{ 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: 'red', 
    height: responsiveHeight(6), 
    width: responsiveWidth(90), 
    borderRadius: 30, 
    // top: responsiveHeight(2) 
  },
  logOutText:{ 
    color: 'white', 
    fontSize: 20, 
    fontWeight: '400', 
  },userLoginInfoText1:{ color: 'white', fontSize: 25, fontWeight: 'bold' },
  userLoginInfoText2:{ color: 'white', fontSize: 17, },
  textParentView:{ width: '75%' },
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1,
    
  },
})