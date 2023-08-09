import React from 'react';
import {View, Dimensions} from 'react-native';

const CardSection = (props) => {
    return (
       <View style={styles.containterStyle}>
         {props.children} 
       </View>
    );
};

const styles = {
    containterStyle: {
      borderWidth: 1,
      borderRadius: 2,
      borderColor: '#ddd',
      borderBottomWidth: 1,
      backgroundColor: '#fff',
      // width: (Dimensions.get('window').width-20), // New line
      padding: 10,
      justifyContent: 'center',
      flexDirection: 'row',
      position: 'relative'
    }
  };

export { CardSection } ;