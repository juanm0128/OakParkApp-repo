import { Text, View } from 'react-native';
import { Header } from './src/components/common';
import CreateAccount from './src/components/CreateAccount';
import { Button, Card, CardSection, Input, Spinner } from './src/components/common';
import { auth } from './src/components/firebase';
import { onAuthStateChanged } from "firebase/auth";
import { Component } from 'react';
import { flushSync } from 'react-dom';
import { setStatusBarTranslucent } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateTicketScreen from './src/components/CreateTicketScreen';
import ViewTicketScreen from './src/components/ViewTicketScreen';
import LogoutForm from './src/components/LogoutForm';
import LoginForm from './src/components/LoginForm';
import UserProfile from './src/components/UserProfile';
import React from 'react';
import MainNavigator from './src/components/MainNavigator';
import LoginProvider from './src/components/LoginProvider';
import ImagePicker from 'react-native-image-picker';

export default function App() {

  return (
    <LoginProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </LoginProvider>
  );
}

/*const Drawer = createDrawerNavigator();

function TopLeftMenu(){
  return(
    <Drawer.Navigator useLegacyImplementation>
      <Drawer.Screen name="Home" component={HomeScreen}/>
      <Drawer.Screen name="LogoutForm" component={LogoutForm} />
      <Drawer.Screen name="LoginForm" component={LoginForm} />
      <Drawer.Screen name="Profile" component={UserProfile} />
    </Drawer.Navigator>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="OakParkApp">
      <Stack.Screen name="OakParkApp" component={TopLeftMenu}/>
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen name="LoginForm" component={LoginForm} />
      <Stack.Screen name="LogoutForm" component={LogoutForm} />
      <Stack.Screen name="Create Service Request" component={CreateTicketScreen} />
      <Stack.Screen name="View Service Request" component={ViewTicketScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

class App extends Component {

  state = { loggedIn: null, RegisterAcc: false, DisplayReg: true };

  UNSAFE_componentWillMount () {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.setState({loggedIn: true});
        this.setState({RegisterAcc: false});
        this.setState({DisplayReg: false})
      } else {
        this.setState({loggedIn: false});
        if (this.setState.RegisterAcc) {

        } else {
          this.setState({DisplayReg: true})
        }
      }
    });
  }

  onButtonPress () {
    this.setState({RegisterAcc: true});
    this.setState({DisplayReg: false})
  }

  renderContent () {
    switch (this.state.loggedIn) {
      case true:
        return <MainScreen/>;
      case false:
        if (this.state.RegisterAcc) {
          return <CreateAccount/>;
        } else {
          return <LoginForm/>;
        }
      default:
        if (this.state.RegisterAcc) {
          return <CreateAccount/>;
        } else {
          return <Spinner/>;
        }
    }
  }

  <Header headerText="OakParkApp Testing"/>


  render () {
    return (
      <View>
        {this.renderContent()}
        {(this.state.DisplayReg) && <Text>
             Please register the account if not done earlier
        </Text> }
        {(this.state.DisplayReg) && <Button onPress={this.onButtonPress.bind(this)}>
          Create Account
        </Button> }
      </View>
    );
  }
}

export default App;*/

