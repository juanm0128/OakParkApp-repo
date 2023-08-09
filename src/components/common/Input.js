import React from 'react';
import { TextInput, View, Text } from 'react-native';

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry, autoCapitalize }) => {

    const {inputStyle, labelStyle, containerStyle} = styles;

    return (
        <View style={containerStyle}>
            <Text style={labelStyle}> {label} </Text> 
            <TextInput
              secureTextEntry={secureTextEntry}
              placeholder={placeholder}
              autoCorrect={false}
              style={inputStyle}
              value={value}
              onChangeText={onChangeText} 
              autoCapitalize={autoCapitalize}
            />
        </View>
    );

};

const styles = {
    inputStyle: {
        color: '#000',
        paddingRight: 2,
        paddingLeft: 2,
        fontSize: 15,
        flex: 2,
        lineHeight: 20
    },
    labelStyle: {
        fontSize: 18,
        flex: 1,
        paddingLeft: 2
    },
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between', // New line
        alignItems: 'center'
    }
};

export { Input };