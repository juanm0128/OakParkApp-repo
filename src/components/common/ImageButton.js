import React from 'react';
import {Text, TouchableOpacity, Dimensions} from 'react-native';

// Make a component
const ImageButton = ({ onPress, children }) => {
    const {buttonStyle, textStyle} = styles;

    return (
        <TouchableOpacity onPress={onPress} style={buttonStyle}>
            <Text style={textStyle}>
                {children}
            </Text>
        </TouchableOpacity>

    );
};

const styles = {
    buttonStyle: {
        //alignSelf: 'stretch',
        justifyContent: 'center', // new line
        alignItems: 'center', // new line
        height: 40, // new line
        //width: (Dimensions.get('window').width), // New line
        borderRadius: 5,
        backgroundColor: '#fff',
        marginLeft: 5,
        marginRight: 5
        },

    textStyle: {
        alignSelf: 'center',
        color: '#007aff',
        fontSize: 17,
        paddingTop: 5,
        paddingBottom: 5
    }

}

export { ImageButton };