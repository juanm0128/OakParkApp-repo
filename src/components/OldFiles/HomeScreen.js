import React, { Component } from "react";
import { Text, View, StyleSheet} from "react-native";
import { CreateTicketDetailsScreen, CreateTicketMenuScreen, Button, CardSection, Input, Spinner } from '../common';
import LogoutForm from '../LogoutForm';
import LoginForm from '../LoginForm';

import { useNavigation } from '@react-navigation/native';


function HomeScreen () {

  const navigation = useNavigation();
  //<Button onPress={() => navigation.navigate('LogoutForm')}> Log Out </Button>
  //<Button onPress={() => navigation.navigate('Create Service Request')}> Create Service Request </Button>
  //<Button onPress={() => navigation.navigate('View Service Request')}> View Service Request </Button>
    return (
        <View style={styles.container}>
            <Button onPress={() => navigation.navigate('LogoutForm')}> Log Out </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default HomeScreen;