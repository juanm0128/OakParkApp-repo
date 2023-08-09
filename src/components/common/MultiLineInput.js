import React from 'react';
import { TextInput, View, Text } from 'react-native';

const MultiLineInput = ({ label, value, onChangeText, placeholder }) => {

    const {inputStyle, labelStyle, containerStyle} = styles;

    return (
        <View style={containerStyle}>
            <Text style={labelStyle}> {label} </Text> 
            <TextInput
              multiline
              numberOfLines={8}
              editable
              maxLength={400}
              placeholder={placeholder}
              //autoCorrect={false}
              style={inputStyle}
              value={value}
              onChangeText={onChangeText} 
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
        flex: 2
    },
    labelStyle: {
        fontSize: 18,
        flex: 1,
        paddingLeft: 2
    },
    containerStyle: {
        flex: 1,
        paddingTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
};

export { MultiLineInput };