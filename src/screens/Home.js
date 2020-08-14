import React, { Component } from "react";
import {
  TouchableHighlight, SafeAreaView, StyleSheet,
  ImageBackground, TouchableOpacity, View, Text, Image,
  ScrollView, StatusBar, BackHandler, FlatList
} from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { responsiveHeight } from "react-native-responsive-dimensions";
import { connect } from "react-redux";
import AsyncStorage from '@react-native-community/async-storage';
import firestore from '@react-native-firebase/firestore';
import { Join, Create, Loader, customAlert } from '@common';
import { fetchScheduleMeeting, deleteScheduleMeeting } from '@action';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false
    };
  }

  componentDidMount() {
    this.props.fetchScheduleMeeting();
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillMount() {
    BackHandler.removeEventListener('hardwareBackPress', () => { return true });
  }
  onBackPress = () => {
    //Logic here for Device back button click
  }

  register() {
    if (this.props.getUserProfile == undefined) {
      this.props.navigation.navigate("Register")
    }
    else {
      customAlert('You are already Registered')
    }
  }
  login() {
    if (this.props.getUserProfile == undefined) {
      this.props.navigation.navigate("Login")
    }
    else {
      customAlert('You are already Logged in')
    }
  }
  forget() {
    if (this.props.getUserProfile == undefined) {
      this.props.navigation.navigate("ForgetPassword")

    }
    else {
      this.props.navigation.navigate("ForgetPassword")
    }
  }
  social() {
    if (this.props.getUserProfile == undefined) {
      this.props.navigation.navigate("SocialLogin")
    }
    else {
      customAlert('You are already Logged in')
    }
  }
  schedule() {
    if (this.props.getUserProfile != undefined) {
      this.props.navigation.navigate("ScheduleMeeting")
    }
    else {
      customAlert('Please Login to schedule')
    }
  }

  async createMeeting(meetingID) {
    const { getUserProfile } = this.props;
    this.setState({ loading: true });
    let data = null;
    if (getUserProfile) {
      const userID = await AsyncStorage.getItem('@userID');
      data = {
        'meetingID': meetingID,
        'createdAt': firestore.FieldValue.serverTimestamp(),
        'meetingType': 'Create',
        'userType': 'Registered',
        'userID': userID
      };
    } else {
      data = {
        'meetingID': meetingID,
        'createdAt': firestore.FieldValue.serverTimestamp(),
        'meetingType': 'Create',
        'userType': 'Guest',
        'userID': ''
      };
    }
    await firestore().collection('VideoSessions').add(data)
      .then((res) => {
        const uid = res._documentPath._parts[1];
        if (uid) {
          this.setState({ loading: false });
          setTimeout(() => {
            this.props.navigation.navigate("Calling", { meetingID: meetingID });
          }, 1500);
        }
      })
      .catch(error => console.error(error));
  }

  cancelMeeting(id) {
    this.setState({ loading: true });
    this.props.deleteScheduleMeeting(id, () => { this.setState({ loading: false }) })
  }

  joinMeeting(id) {
    this.createMeeting(id);
  }

  renderMeetingLists = ({ item }) => {
    return (
      <View style={styles.meetingListContainer}>
        <View style={styles.meetingInside}>
          <View style={styles.meetingDetailView}>
            <Text style={styles.meetingDetails2}>{item.subject}</Text>
            <Text style={styles.meetingDetails}>{item.date}<Text style={styles.meetingDetails}> {item.time}</Text></Text>
            <Text style={styles.meetingDetails}>Duration : {item.duration}</Text>
            <Text style={styles.meetingDetails}>Meeting By : <Text style={styles.meetingText}>{this.props.getUserProfile.userName}</Text></Text>
            <Text style={styles.meetingDetails}>Meeting ID : <Text style={styles.meetingText}>{item.meetingID}</Text></Text>
            <Text style={styles.meetingDetails}>Participants : <Text style={styles.meetingText}>{item.participents}</Text></Text>

          </View>
          <View style={styles.buttonView}>
            <Button
              buttonStyle={[styles.button, { backgroundColor: '#39d10b' }]}
              title="Join"
              onPress={() => this.joinMeeting(item.meetingID)}
              disabled={this.state.email == '' || this.state.pass == ''}
            />
            <Button
              buttonStyle={styles.button}
              title="Cancel"
              onPress={() => this.cancelMeeting(item.meetingID)}
            />
          </View>
        </View>
      </View>
    );
  }


  render() {
    const { getUserProfile, userImagePath, todayMeeting, nextMeeting } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground  style={styles.background}>
          <StatusBar translucent={true} backgroundColor={'transparent'} />

          {getUserProfile != null ? <View style={styles.topView}>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.imageView}>
                <Image
                  style={styles.image}
                  resizeMode='cover'
                  source={userImagePath ? { uri: userImagePath } : require('@assets/profile2.png')}  >
                </Image>
              </View>
              <View style={styles.userInfo}>
                <Text style={styles.name}>{getUserProfile.userName}</Text>
                <Text style={styles.city}>{getUserProfile.city}</Text>
              </View>
            </View>

            <View style={styles.profileOption}>
              <Image
                style={styles.profileOptionImage}
                resizeMode='contain'
                source={require('@assets/star.png')} >
              </Image>
              <TouchableHighlight onPress={() => {
                this.props.navigation.navigate("Profile")
              }}
                style={styles.profileClick}
              >
                <Icon name="user" type='font-awesome'
                  size={22} color="#595959" />
              </TouchableHighlight>
            </View>
          </View> : <View style={styles.logoView}>
              <Image
                style={styles.logoImageView}
                resizeMode='contain'
                source={require('@assets/logo.png')} >
              </Image>
            </View>}

          <View style={styles.optionMainView}>
            <View style={styles.row}>
              <View style={styles.centerView}>
                <TouchableOpacity onPress={() => {
                  this.schedule()
                }} style={styles.options}>
                  <Image
                    style={styles.optionImage}
                    resizeMode='contain'
                    source={require('@assets/meeting.png')} >
                  </Image>
                </TouchableOpacity>
                <Text style={styles.optionsText}>Arrange Meeting</Text>
              </View>
              <View style={styles.centerView}>
                <TouchableOpacity onPress={() => {
                  this.Join.show()
                }} style={styles.options}>
                  <Image
                    style={styles.optionImage}

                    resizeMode='contain'
                    source={require('@assets/team.png')} >
                  </Image>
                </TouchableOpacity>
                <Text style={styles.optionsText}>Join Meeting</Text>
              </View>
              <View style={styles.centerView}>
                <TouchableOpacity onPress={() => {
                  this.Create.show()
                }} style={styles.options}>
                  <Image
                    style={styles.optionImage}

                    resizeMode='contain'
                    source={require('@assets/video-call.png')} >
                  </Image>
                </TouchableOpacity>
                <Text style={styles.optionsText}>Create Meeting</Text>
              </View>

              <View style={styles.centerView}>
                <TouchableOpacity onPress={() => {
                  this.props.navigation.navigate("MeetingHistory")
                }} style={styles.options}>
                  <Image
                    style={styles.optionImage}
                    resizeMode='contain'
                    source={require('@assets/conference.png')} >
                  </Image>
                </TouchableOpacity>
                <Text style={styles.optionsText}>Meeting Archives</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.centerView}>
                <TouchableOpacity onPress={() => {
                  this.register()
                }} style={styles.options}>
                  <Image
                    style={styles.optionImage}

                    resizeMode='contain'
                    source={require('@assets/add.png')} >
                  </Image>
                </TouchableOpacity>
                <Text style={styles.optionsText}>Signup</Text>
              </View>
              <View style={styles.centerView}>
                <TouchableOpacity onPress={() => {
                  this.login()
                }} style={styles.options}>
                  <Image
                    style={styles.optionImage}

                    resizeMode='contain'
                    source={require('@assets/user1.png')} >
                  </Image>
                </TouchableOpacity>
                <Text style={styles.optionsText}>Sign On</Text>
              </View>
              <View style={styles.centerView}>
                <TouchableOpacity onPress={() => {
                  this.forget()
                }} style={styles.options}>
                  <Image
                    style={styles.optionImage}

                    resizeMode='contain'
                    source={require('@assets/key.png')} >
                  </Image>
                </TouchableOpacity>
                <Text style={styles.optionsText}>Forget Password</Text>
              </View>
              <View style={styles.centerView}>
                <TouchableOpacity onPress={() => {
                  this.props.navigation.navigate("SocialLogin")
                }} style={styles.options}>
                  <Image
                    style={styles.optionImage}

                    resizeMode='contain'
                    source={require('@assets/calendar.png')} >
                  </Image>
                </TouchableOpacity>
                <Text style={styles.optionsText}>Planner</Text>
              </View>
            </View>
            <View style={styles.meetingView}>

              <ScrollView style={styles.ScrollView}>
                <View style={styles.meetingContainer}>
                  <View style={styles.titleView1}>
                    <Text style={styles.title1}>
                      Today Meeting
                   </Text>
                    <Text style={styles.dash1}>
                      ──
                    </Text>
                  </View>

                  {todayMeeting &&
                    <FlatList
                      data={todayMeeting}
                      renderItem={this.renderMeetingLists}
                      horizontal={true}
                      extraData={this}
                    />
                  }

                  <View style={styles.nextMeetingView}>
                    <Text style={styles.title2}>Next Day Meeting</Text>
                    <Text style={styles.dash2}>──</Text>
                  </View>
                  {nextMeeting &&
                    <FlatList
                      data={nextMeeting}
                      renderItem={this.renderMeetingLists}
                      horizontal={true}
                      extraData={this}
                    />
                  }
                </View>
              </ScrollView>
            </View>
          </View>


          <Join
            {...this.props}

            ref={popup => {
              this.Join = popup;
            }}
          />
          <Create
            {...this.props}

            ref={popup => {
              this.Create = popup;
            }}
          />
          {this.state.loading && <Loader />}
        </ImageBackground>
      </SafeAreaView>

    );
  }
}

const mapStateToProps = ({ utils }) => {
  const { getUserProfile, userImagePath, todayMeeting, nextMeeting } = utils;
  return { getUserProfile, userImagePath, todayMeeting, nextMeeting };
};



export default connect(mapStateToProps, { fetchScheduleMeeting, deleteScheduleMeeting })(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  imageView: {
    height: 80,
    width: 80,
    backgroundColor: 'grey',
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    top: 20,
    left: 20
  },
  meetingDetails: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'left',
    width: '95%'

  },
  meetingDetails2: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'left',
    width: '95%'
  },
  meetingDetailView: {
    backgroundColor: '#8b54ff',
    width: '70%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  meetingListContainer: {
    backgroundColor: '#8b54ff',
    height: 150,
    width: 360,
    borderRadius: 6,
    padding: 10,
    marginLeft: 10
  },
  meetingInside: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  optionImage: {
    height: '70%',
    width: '70%'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  },
  optionMainView: {
    top: 20,
    height: '85%',
    width: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 30,
    padding: 10
  },
  meetingView: {
    paddingHorizontal: 10,
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: responsiveHeight(45),
    height: responsiveHeight(40),
    borderRadius: 6,
    padding: 10
  },
  meetingContainer: {
    backgroundColor: 'transparent',
    width: responsiveHeight(48)
  },
  titleView1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 1
  },
  title1: {
    color: '#cacaca',
    fontSize: 19,
    fontWeight: 'bold'
  },
  dash1: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold'
  },
  dash2: {
    color: '#cacaca',
    fontSize: 25,
    fontWeight: 'bold'
  },
  nextMeetingView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10
  },
  title2: {
    color: '#cacaca',
    fontSize: 19,
    fontWeight: 'bold'
  },
  logoView: {
    height: '15%',
    width: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center'
  },
  profileClick: {
    height: 30,
    width: 30,
    backgroundColor: 'white',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  city: {
    color: 'grey',
    fontSize: 17,
    fontWeight: 'bold'
  },
  ScrollView: {
    backgroundColor: 'transparent',
    height: responsiveHeight(50),
    width: responsiveHeight(45)
  },
  userInfo: {
    padding: 10,
    height: 80,
    width: 150,
    backgroundColor: 'transparent',
    alignItems: 'flex-start',
    justifyContent: 'center',
    top: 20,
    left: 20
  },
  profileOption: {
    position: 'absolute',
    flexDirection: 'row',
    height: 50, width: 100,
    backgroundColor: 'transparent',
    top: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  name: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold'
  },
  image: {
    height: '90%',
    width: '90%',
    overflow: 'hidden',
    borderRadius: 55
  },
  topView: {
    height: '15%',
    width: '100%',
    backgroundColor: 'transparent',
  },
  background: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight
  },

  options: {
    height: responsiveHeight(10),
    width: responsiveHeight(10),
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation:10,
    
    
  },
  optionsText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 15,
    width: responsiveHeight(11)
  },

  button: {
    width: 70,
    height: 35,
    backgroundColor: '#e87d2e',
    borderRadius: 5,
  },
  centerView: { alignItems: 'center', },
  buttonView: {
    backgroundColor: '#8b54ff',
    width: '30%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  meetingText: { color: '#fff', fontSize: 15, textAlign: 'left', width: '100%' },
  profileOptionImage: { height: 30, width: 30 },
  logoImageView: { height: '100%', width: 120 }
})