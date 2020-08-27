import React from 'react';
import { View, StyleSheet, TextInput, Image } from 'react-native';
import { responsiveWidth } from "react-native-responsive-dimensions";
import { Icon } from 'react-native-elements';
const UserName = '../../assets/userres.png'
const City = '../../assets/city.png'
const Email = '../../assets/emailreg.png'
const Password = '../../assets/password.png'
const Phone = '../../assets/phone.png'
const Pin = '../../assets/pincode.png'
const State = '../../assets/state.png'

const getIcon = (position) => {
    switch (position) {
        case 1:
            return require(UserName);
        case 2:
            return require(Password);
        case 3:
            return require(Phone);
        case 4:
            return require(Email);
        case 5:
            return require(City);
        case 6:
            return require(State);
        case 7:
            return require(Pin)
    }

}

export default class InputBoxRegister extends React.Component {

    render() {
        const { icon, onChangeText, name, fontType, keyboardType, secureTextEntry,imgPos } = this.props;
        return (
            <View style={styles.searchSection}>
                <Image resizeMode={'center'} style={styles.imgStyle} source={getIcon(imgPos)} />
                <TextInput
                    style={styles.input}
                    placeholder={name}
                    onChangeText={(text) => onChangeText(text)}
                    underlineColorAndroid="transparent"
                    keyboardType={keyboardType ? keyboardType : ''}
                    secureTextEntry={secureTextEntry ? true : false}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    searchSection: {
        marginBottom: 2,
        height: 60,
        width: responsiveWidth(85),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: '#f5f5f5',
        borderRadius: 5,
        overflow: 'hidden',
        borderWidth: 2
    },
    searchIcon: {
        padding: 10,
    },
    input: {
        width: '100%',
        marginLeft: 3,
        padding: 0,
        height: '100%',
        textAlign: 'left',
        fontSize: 15,
        backgroundColor: 'white',
        color: '#959595'
    },
    imgStyle:{ width: 20, height: 20, alignSelf: 'center',margin:10 }
});
