import React from 'react';
import {Text, View} from 'react-native';

// Make a component
const Header = (props) => {
    const {textStyle, viewStyle} = styles;

    return (
        <View style={viewStyle}>
          <Text style={textStyle}>{props.headerText}</Text>
        </View>
    );
};

const styles = {
    viewStyle: {
        backgroundColor: '#F8F8F8',
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
        paddingTop: 10,
        shadowColor: '#001',
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.2
    },

    textStyle: {
        fontSize: 25
    }

}

export { Header } ; 