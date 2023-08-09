import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import InitialScreen from './InitialScreen';
//import ImageUpload from './ImageUpload';
import UserProfile from './UserProfile';
import { useLogin } from './LoginProvider';
import DrawerNavigator from './DrawerNavigator';
import HomeScreen from './OldFiles/HomeScreen';
import LogoutForm from './LogoutForm';
import LoginForm from './LoginForm';
import CreateTicketScreen from './CreateTicketScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={InitialScreen} name='InitialScreen' />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  const { isLoggedIn } = useLogin();
  return isLoggedIn ? <DrawerNavigator /> : <StackNavigator />;
};

export default MainNavigator;