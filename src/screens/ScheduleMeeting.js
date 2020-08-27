import React, { Component, } from "react";
import { StyleSheet, ScrollView, View,  StatusBar, Text, Image } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchScheduleMeeting } from '@action';
import firestore from '@react-native-firebase/firestore';
import { Loader, Header } from "@common";
import AsyncStorage from '@react-native-community/async-storage';
import DatePicker from 'react-native-datepicker'
import { TextInput } from 'react-native-paper'
import LinearGradient from 'react-native-linear-gradient';

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
      <View  style={styles.container}>
                
                <LinearGradient
          start={{x: 0.0, y: 0.25}}
          end={{x: 0.5, y: 1.0}}
          locations={[0, 0.5, 0.6]}
          colors={['#8960c7','#7964d1','#656adf']}
          style={styles.imgBackground}>
            <StatusBar translucent={true} backgroundColor={'transparent'} />
        <Header {...this.props} />
        <View style={styles.contentContainer}>
          <ScrollView contentContainerStyle={styles.scrollView}>
            {/* <View style={styles.imageContainer}>
               <Image
                style={styles.image}
                resizeMode='contain'
                source={require('@assets/Schedule.png')} >
              </Image> 
            </View> */}
            <Text style={styles.headingText}>Schedule Your Meeting</Text>
            <View style={styles.searchSection}>
              <TextInput
               mode='outlined'
                style={styles.input}
                label="Meeting ID"
                onChangeText={(text) => this.setState({ meetingID: text })}
                underlineColorAndroid="transparent"
                theme={{ colors: { placeholder: '#05b4ea', text: '#05b4ea', primary: "#ffa50c",underlineColor:'transparent',background : 'white'}}}

              />
            </View>
            <View style={styles.searchSection}>
              <TextInput
               mode='outlined'
                style={styles.input}
                label="Meeting Subject"
                onChangeText={(text) => this.setState({ subject: text })}
                underlineColorAndroid="transparent"
                theme={{ colors: { placeholder: '#05b4ea', text: '#05b4ea', primary: "#ffa50c",underlineColor:'transparent',background : 'white'}}}

              />
            </View>
            <View style={styles.searchSection}>
              <TextInput
               mode='outlined'
                style={styles.input}
                label="Meeting Participents"
                onChangeText={(text) => this.setState({ participents: text })}
                underlineColorAndroid="transparent"
                theme={{ colors: { placeholder: '#05b4ea', text: '#05b4ea', primary: "#ffa50c",underlineColor:'transparent',background : 'white'}}}

              />
            </View>
            <View style={styles.searchSection}>
              <TextInput
               mode='outlined'
                style={styles.input}
                label="Time"
                onChangeText={(text) => this.setState({ time: text })}
                underlineColorAndroid="transparent"
                theme={{ colors: { placeholder: '#05b4ea', text: '#05b4ea', primary: "#ffa50c",underlineColor:'transparent',background : 'white'}}}

              />
              
            </View>
            <View style={styles.searchSection}>
              <TextInput
               mode='outlined'
                style={styles.input}
                label="Duration"
                onChangeText={(text) => this.setState({ duration: text })}
                underlineColorAndroid="transparent"
                theme={{ colors: { placeholder: '#05b4ea', text: '#05b4ea', primary: "#ffa50c",underlineColor:'transparent',background : 'white'}}}

              />
            
            </View>
            <View style={styles.searchSections}>
              <DatePicker
              showIcon={false}
                style={styles.datePicker}
                date={this.state.date}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate={new Date()}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateInput:{borderWidth: 0,borderColor:'#05b4ea',height: 50,color: '#05b4ea',}, 
                }}
                onDateChange={(date) => { this.setState({ date: date }) }}
              />

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
        </LinearGradient>
      </View>
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
    height: '80%',
    width: '80%',
  },
  searchSection: {
    
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
   
 
  
  },
  searchSections: {
    marginTop: 15,
    width: '100%',
    flexDirection: 'row',
   backgroundColor:'white',
   borderWidth: 1,borderColor:'#05b4ea'
  },
  searchIcon: {
    padding: 10,
  },
  button: {
    width: 350,
    height: 45,
    backgroundColor: '#8b54ff',
    borderRadius: 5,
    marginTop:10
  },
  input: {
    height: 50, width: "95%", margin: 5,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection:'column',
   
  },
  contentContainer: {
    height: '80%',
    width: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  scrollView: {
    height: '100%',
    width: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    height: 150,
    width: 200,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headingText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  datePicker: {
    height: 50,
    width: '95%',
   color:'#5b19ea'
  },
  dateIcon: {
    position: 'absolute',
    left: 0,
    top: 4,
    marginLeft: 0
  },
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1,
    paddingTop:25
  },
})