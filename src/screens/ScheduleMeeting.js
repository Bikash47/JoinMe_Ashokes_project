import React, { Component, } from "react";
import { StyleSheet, ScrollView, View, TextInput, ImageBackground, Text, Image } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchScheduleMeeting } from '@action';
import firestore from '@react-native-firebase/firestore';
import { Loader, Header } from "@common";
import AsyncStorage from '@react-native-community/async-storage';
import DatePicker from 'react-native-datepicker'
class ScheduleMeeting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: '',
      participents: '',
      time: '',
      date: '',
      duration: '',
      meetingID: '',
      loading: false
    };
  }


  async scheduleMeeting() {
    const { meetingID, subject, participents, time, duration, date } = this.state;
    const { getUserProfile } = this.props;
    this.setState({ loading: true });
    let data = null;
    if (getUserProfile) {
      const userID = await AsyncStorage.getItem('@userID');
      data = {
        'meetingID': meetingID,
        'subject': subject,
        'participents': participents,
        'time': time,
        'date': date,
        'duration': duration,
        'createdAt': firestore.FieldValue.serverTimestamp(),
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

    await firestore().collection('ScheduleMeeting').add(data)
      .then((res) => {
        const uid = res._documentPath._parts[1];
        if (uid) {
          this.setState({ loading: false });
          this.props.fetchScheduleMeeting();
          setTimeout(() => {
            this.props.navigation.navigate("Home", { meetingID: meetingID });
          }, 1500);
        }
      })
      .catch(error => console.error(error));
  }

  render() {
    return (
      <ImageBackground source={require('@assets/bg-screen.png')} style={styles.container}>
        <Header {...this.props} />
        <View style={styles.contentContainer}>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                resizeMode='contain'
                source={require('@assets/Schedule.png')} >
              </Image>
            </View>
            <Text style={styles.headingText}>Schedule Your Meeting</Text>
            <View style={styles.searchSection}>
              <Icon style={styles.searchIcon} name="clipboard-outline" type='material-community' size={25} color="#595959" />
              <TextInput
                style={styles.input}
                placeholder="Meeting ID"
                onChangeText={(text) => this.setState({ meetingID: text })}
                underlineColorAndroid="transparent"
              />
              <View style={styles.searchIcon} name="microphone" type='font-awesome' size={25} color="#595959" />
            </View>
            <View style={styles.searchSection}>
              <Icon style={styles.searchIcon} name="flag" type='font-awesome' size={25} color="#595959" />
              <TextInput
                style={styles.input}
                placeholder="Meeting Subject"
                onChangeText={(text) => this.setState({ subject: text })}
                underlineColorAndroid="transparent"
              />
              <View style={styles.searchIcon} name="microphone" type='font-awesome' size={30} color="#595959" />
            </View>
            <View style={styles.searchSection}>
              <Icon style={styles.searchIcon} name="user" type='font-awesome' size={25} color="#595959" />
              <TextInput
                style={styles.input}
                placeholder="Meeting Participents"
                onChangeText={(text) => this.setState({ participents: text })}
                underlineColorAndroid="transparent"
              />
              <View style={styles.searchIcon} name="microphone" type='font-awesome' size={25} color="#595959" />
            </View>
            <View style={styles.searchSection}>
              <Icon style={styles.searchIcon} name="id-card-o" type='font-awesome' size={20} color="#595959" />
              <TextInput
                style={styles.input}
                placeholder="Time"
                onChangeText={(text) => this.setState({ time: text })}
                underlineColorAndroid="transparent"
              />
              <View style={styles.searchIcon} name="microphone" type='font-awesome' size={30} color="#595959" />
            </View>
            <View style={styles.searchSection}>
              <DatePicker
                style={styles.datePicker}
                date={this.state.date}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate={new Date()}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: styles.dateIcon,
                  dateInput: { marginLeft: 36 }
                }}
                onDateChange={(date) => { this.setState({ date: date }) }}
              />
              <View style={styles.searchIcon} name="microphone" type='font-awesome' size={30} color="#595959" />
            </View>
            <View style={styles.searchSection}>
              <Icon style={styles.searchIcon} name="clock" type='entypo' size={25} color="#595959" />
              <TextInput
                style={styles.input}
                placeholder="Duration"
                onChangeText={(text) => this.setState({ duration: text })}
                underlineColorAndroid="transparent"
              />
              <View style={styles.searchIcon} name="microphone" type='font-awesome' size={30} color="#595959" />
            </View>
          </ScrollView>
          <Button
            buttonStyle={styles.button}
            title="Send"
            onPress={() => { this.scheduleMeeting() }}
            disabled={this.state.email == '' || this.state.pass == ''}
          />
        </View>
        {this.state.loading && <Loader />}
      </ImageBackground>
    );
  }
}
const mapStateToProps = ({ utils }) => {
  const { getUserProfile, userImagePath } = utils;
  return { getUserProfile, userImagePath };
};

export default connect(mapStateToProps, { fetchScheduleMeeting })(ScheduleMeeting);

const styles = StyleSheet.create({

  image: {
    height: '100%',
    width: '100%',
  },
  searchSection: {
    height: 40,
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
    color: '#959595'
  },
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  contentContainer: {
    height: '85%',
    width: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20
  },
  scrollView: {
    height: '100%',
    width: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  imageContainer: {
    height: 150,
    width: 200,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headingText: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  datePicker: {
    height: 40,
    width: '90%',
    borderColor: 'white',
    borderWidth: 0
  },
  dateIcon: {
    position: 'absolute',
    left: 0,
    top: 4,
    marginLeft: 0
  }
})