import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { responsiveHeight, } from "react-native-responsive-dimensions";
class Header extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => { this.props.navigation.goBack() }} style={styles.iconStyle}>
          <Icon name="arrow-left" type='material-community' size={30} color="white" />
        </TouchableOpacity>
        <Image
          style={styles.image}
          resizeMode='contain'
          source={require('@assets/logo.png')} >
        </Image>
      </View>
    );
  }
}
export default Header;
const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: 120,
  },
  container: {
    top: responsiveHeight(2),
    height: '15%',
    width: '100%',
    zIndex: 100,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconStyle:{ 
    position: 'absolute', 
    left: 20, 
    top: 10 
  }
})