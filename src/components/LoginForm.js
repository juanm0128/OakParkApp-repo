import React, { useState } from 'react';
import { Text } from 'react-native';
import { auth } from './firebase';
import { useLogin } from './LoginProvider';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { Button, Card, CardSection, Input, Spinner } from './common';
import { useNavigation } from '@react-navigation/native';


function LoginForm ()  {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [signInError, setSignInError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const { setIsLoggedIn } = useLogin();

  const onButtonPress = () => {
    setSignInError('');
    setLoading(true);
    
    signInWithEmailAndPassword(auth, email, password)
      .then (onLoginSucess)
      .catch(onLoginFail);
  }

  const onLoginSucess = () => {
    setEmail('');
    setPassword('');
    setSignInError('');
    setLoading(false);
    setIsLoggedIn(true);
    //navigation.navigate('HomeScreen');
  }

  const onLoginFail = () => {
    setEmail('');
    setPassword('');
    setSignInError('Auth Failed');
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
              <CardSection >
                <Input 
                  placeholder="user@gmail.com"
                  label="Email"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={email => setEmail(email)}
                />
              </CardSection>

              <CardSection>
                <Input
                  secureTextEntry
                  placeholder="password"
                  label="Password"
                  autoCapitalize="none"
                  value={password}
                  onChangeText={password => setPassword(password)}
                />
              </CardSection>


              <Text style={styles.errorTextStyle}>
                {signInError}
              </Text>
              
              
              <Button onPress={onButtonPress}>
                Log In 
               </Button>
            </Card>
        );

}

export default LoginForm;
