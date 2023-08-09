import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { auth, db } from './firebase';
import { signOut } from "firebase/auth";
import { doc, addDoc, getDocs, getDoc, collection, setDoc, onSnapshot } from 'firebase/firestore';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/drawer';

//import Tasks from './Tasks';
import { useLogin } from './LoginProvider';
import HomeScreen from './OldFiles/HomeScreen';
import UserProfile from './UserProfile';
import LogoutForm from './LogoutForm';
import CreateTicketScreen from './CreateTicketScreen';
import ViewTicketScreen from './ViewTicketScreen';
import { query, where } from "firebase/firestore";
import LoginForm from './LoginForm';

const Drawer = createDrawerNavigator();

const CustomDrawer = props => {
  const {isLoggedIn, setIsLoggedIn } = useLogin();
  const email = auth.currentUser.email
  const userDocRef = doc(db,"userProfileCollection", email)
  const [user, setUser] = useState({})
  const [userProfileActive, setUserProfileActive] = useState(false)


   useEffect(() => {
    const getUser = async () => {
      const snap = await getDoc(userDocRef)
      if(snap.exists()) {
        setUser(snap.data())
        setUserProfileActive(true)
      } else {
        setUserProfileActive(false)
      }
    }
    getUser()
  },[])

     return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 20,
            backgroundColor: '#f6f6f6',
            marginBottom: 20,
          }}
        >
      
          <View>
            <Text>{(userProfileActive === true) ? user.userName : 'Default Name' }</Text>
            <Text>{(userProfileActive === true) ? user.userEmail : auth.currentUser.email }</Text>
            <Text>{(userProfileActive === true) ? user.userPhone : 'Default Phone No' }</Text>
          </View>
          <Image
            source={{
              uri:
                'https://i.pinimg.com/222x/57/70/f0/5770f01a32c3c53e90ecda61483ccb08.jpg',
            }}
            style={{ width: 60, height: 60, borderRadius: 30 }}
          />
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <TouchableOpacity
        style={{

          position: 'absolute',
          right: 0,
          left: 0,
          bottom: 50,
          backgroundColor: '#f6f6f6',
          padding: 20,
        }}
        onPress={() => {signOut(auth), setIsLoggedIn(false)}}
      >
        <Text>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

function getHeaderTitle(route) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'CreateTicketScreen';

  switch (routeName) {
    case 'CreateTicketScreen':
      return 'Create Ticket';
    case 'UserProfile':
      return 'User profile';
    case 'ViewTicketScreen':
      return 'Ticket Summary';
  }
}

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true, // old argument was true
        headerStyle: {
          backgroundColor: 'transparent',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitle: 'Óak Park App',
      }}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen component={CreateTicketScreen} name='CreateTicketScreen' options={{ drawerLabel: 'Create Ticket', title: 'Create Ticket' }} />
      <Drawer.Screen component={UserProfile} name='UserProfile' options={{ drawerLabel: 'Update User Profile', title: 'User Profile' }} />
      <Drawer.Screen component={ViewTicketScreen} name='ViewTicketScreen' options={{ drawerLabel: 'View Ticket Summary', title: 'View Tickets' }} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;