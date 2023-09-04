import React from 'react';
import {Dimensions, KeyboardAvoidingView, Platform, StyleSheet, View} from 'react-native';

const Card = (props) => {
    return (
      <KeyboardAvoidingView
       enabled
       behavior={Platform.OS === 'ios' ? 'padding' : null}
       style={styles.container}>
       
       <View style={styles.containterStyle}>
         {props.children} 
       </View>
       </KeyboardAvoidingView>
    );
};

const styles = {
    containterStyle: {
        borderWidth: 0,
        borderRadius: 4,
        borderColor: '#fff',
        borderBottomWidth: 0,
        justifyContent: 'flex-start',
        //flexDirection: 'row',
        width: (Dimensions.get('window').width-10), // New line
        paddingHorizontal: 20, // New line
        position: 'relative',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10
    }
  };

export { Card } ;