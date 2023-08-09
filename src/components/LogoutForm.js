import React, { useState } from 'react';
import { Text } from 'react-native';
import { auth } from './firebase';
import { signOut } from "firebase/auth";
import { Button, Card, CardSection, Input, Spinner } from './common';
import { useNavigation } from '@react-navigation/native';



/*

function renderButton () {
    if (loading) {
      return <Spinner size="small" />;    
    }

    return (
        <Button onPress={this.onButtonPress}>
          Log Out 
        </Button>
    );
  } 

      <Text style={styles.errorTextStyle}>
                {error}
              </Text>
*/

function LogoutForm () {

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [signOuterror, setSignOuterror] = useState('Initial');
const [loading, setLoading] = useState(true);
const navigation = useNavigation();
const { setIsLoggedIn } = useLogin();

 const onButtonPress = () => {
  setSignOuterror('Checking');
  setLoading(true);
  
  signOut(auth)
  .then (onLogoutSucess)
  .catch(onLogoutFail);
 }

 const onLogoutSucess = () => {
  setEmail('');
  setPassword('');
  setSignOuterror('');
  setLoading(false);
  setIsLoggedIn(false);
}

const onLogoutFail = () => {
  setEmail('');
  setPassword('');
  setSignOuterror('Auth Failed');
  setLoading(false);
}


const  styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
}

        return (
            <Card>
              <Text style={styles.errorTextStyle}>
                {signOuterror}
              </Text>
              
              <CardSection >
               <Button onPress={onButtonPress}>
                Log Out 
               </Button>
              </CardSection>
            </Card>
        );
}





export default LogoutForm;

