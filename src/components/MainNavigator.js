import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import InitialScreen from './InitialScreen';
//import ImageUpload from './ImageUpload';
import UserProfile from './UserProfile';
import { Image } from "react-native";
import { useLogin } from './LoginProvider';
import DrawerNavigator from './DrawerNavigator';
import HomeScreen from './OldFiles/HomeScreen';
import LogoutForm from './LogoutForm';
import LoginForm from './LoginForm';
import CreateTicketScreen from './CreateTicketScreen';
import ViewTicketScreen from './ViewTicketScreen';
import UpdateTicketByUserScreen from './UpdateTicketByUserScreen';
import AddProfilePic from './AddProfilePic';
import { Card, Button, CreateTicketDetailsScreen, CreateTicketMenuScreen, CardSection, Input, Spinner, Header, MultiLineInput } from './common';
import { Icon } from '@rneui/themed';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation, Link, Screen, Navigator, NavigationContainer } from '@react-navigation/native';
import {DrawerActions} from '@react-navigation/native';

const Stack = createStackNavigator();


const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={InitialScreen} name='InitialScreen' />
    </Stack.Navigator>
  );
};

const DrawerStackNavigator = () => {
  //const { navigation } = useNavigation();
  return (
    <Stack.Navigator
        screenOptions={({ navigation, route }) => ({
            headerShown: true,
            headerTitle: () => (
                <Image
                    source={{ uri: 'https://opbd.org/wp-content/uploads/2017/10/logo.png' }}
                    style={{ width: 135, height: 91, alignSelf: 'center', resizeMode: 'contain' }}
                />
            ),
            headerBackTitle: 'Back'
        })}>
      <Stack.Screen component={DrawerNavigator} name='DrawerNavigator' />
      <Stack.Screen component={UpdateTicketByUserScreen} name='UpdateTicketByUserScreen' screenOptions={{ headerShown: true, headerTitle: 'oak park app'}}
      />
      <Stack.Screen component={AddProfilePic} name='AddProfilePic' />
    </Stack.Navigator>
  );
};



const MainNavigator = () => {
  const { isLoggedIn } = useLogin();
  return isLoggedIn ? <DrawerStackNavigator /> : <StackNavigator />;
};

export default MainNavigator;