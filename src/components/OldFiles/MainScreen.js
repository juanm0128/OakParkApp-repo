import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserProfile from '../UserProfile';
import LogoutForm from '../LogoutForm';
import HomeScreen from './HomeScreen';
import CreateTicketScreen from '../CreateTicketScreen';
import ViewTicketScreen from '../ViewTicketScreen';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();


//function MainScreen () {
class MainScreen extends Component {

  TopLeftMenu () {
      <Drawer.Navigator useLegacyImplementation>
        <Drawer.Screen name="Home" component={HomeScreen}/>
        <Drawer.Screen name="Log Out" component={LogoutForm} />
      </Drawer.Navigator>
  }

  //<Stack.Screen name="MainScreenDrawer" component={this.TopLeftMenu}/>


  render () {
    return (
      <Stack.Navigator initialRouteName="View Service Request">
        <Stack.Screen name="Create Service Request" component={CreateTicketScreen}/>
        <Stack.Screen name="View Service Request" component={ViewTicketScreen}/>
      </Stack.Navigator>
    );
  }
}

export default MainScreen; 