import React from 'react';
import { Text, View, StyleSheet} from 'react-native';

const CreateTicketDetailsScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Create Service Request Details 2</Text>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export { CreateTicketDetailsScreen }; 