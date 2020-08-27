import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { responsiveWidth } from "react-native-responsive-dimensions";
import { Icon } from 'react-native-elements';

export default class InputBox extends React.Component {
    render() {
        const { icon, onChangeText, name, fontType, keyboardType, secureTextEntry } = this.props;
        return (
            <View style={styles.searchSection}>
                <Icon style={styles.searchIcon} name={icon} type={fontType ? fontType : 'font-awesome'} size={25} color="#595959" />
                <TextInput
                    style={styles.input}
                    label={name}
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
        height: 50,
        width: responsiveWidth(90),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderColor: 'rgba(0,0,0,0.5)',
        borderRadius: 5,
        overflow: 'hidden'
    },
    searchIcon: {
        padding: 10,
    },
    input: {
        width: '100%',
        margin: 0,
        padding: 0,
        height: '100%',
        textAlign: 'left',
        fontSize: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
        color: '#959595'
    },
});
