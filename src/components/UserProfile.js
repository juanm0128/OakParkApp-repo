import React, { Component } from 'react';
import { Text } from 'react-native';
import { auth, db } from './firebase';
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { Button, Card, CardSection, Input, Spinner } from './common';
import { doc, addDoc, getDocs, collection, setDoc } from 'firebase/firestore';


class UserProfile extends Component {

  state = { userEmail: '', userId: '', userName: '', userPhone: '', userHomeNo: '', userStreet: '', 
            userCity: '', userZipCode: '', userState: '', error: '', loading: false, userTkNo: 0 };
  
    UNSAFE_componentWillMount () {
      onAuthStateChanged(auth, (user) => { 
        if (user) {
          this.setState({ userEmail: auth.currentUser.email, userId: auth.currentUser.uid });
        } else {
          this.setState({ userEmail: "default@user.com", userId: "defaultUserId" });
        }
      });
    }

   onButtonPress = async () => {
    
    this.setState({ loading: true });

    const { userEmail, userId, userName, userPhone, userHomeNo, userStreet, userCity, userZipCode, userState, userTkNo} = this.state;

    
    // Add a new document with a generated id.
    const docRef =  await setDoc(doc(db, "userProfileCollection", userEmail), {
     userName: userName,
     userPhone: userPhone, 
     userHomeNo: userHomeNo, 
     userStreet: userStreet, 
     userCity: userCity, 
     userZipCode: userZipCode,
     userState: userState,
     userEmail: userEmail,
     userTkNo: userTkNo,
     userId: userId
    })
    .then (this.onCreateAccountSucess.bind(this))
    .catch(this.onCreateAccountFail.bind(this))
  }

  onCreateAccountSucess () {
    this.setState ({
      userName: '',
      userPhone: '',
      userHomeNo: '', 
      userStreet: '', 
      userCity: '', 
      userZipCode: '',
      userState: '',
      userTkNo: '',
      loading: false,
      error: 'Profile update success'
     });
  }

  onCreateAccountFail () {
    this.setState ({
      userName: '',
      userPhone: '',
      userHomeNo: '', 
      userStreet: '', 
      userCity: '', 
      userZipCode: '',
      userState: '',
      userTkNo: '',
      loading: false,
      error: 'Profile update failed'
    });

  }


    render () {
        return (
            <Card>
              <CardSection >
                <Input 
                  placeholder="Business Name"
                  label="Name"
                  value={this.state.userName}
                  onChangeText={userName => this.setState({ userName })}
                />
              </CardSection>

              <CardSection>
                <Input
                  placeholder="Phone Number"
                  label="Phone"
                  value={this.state.userPhone}
                  onChangeText={userPhone => this.setState({ userPhone })}
                />
              </CardSection>
              
              <CardSection>
                <Input
                  placeholder="Bldg Number"
                  label="Bldg Number"
                  value={this.state.userHomeNo}
                  onChangeText={userHomeNo => this.setState({ userHomeNo })}
                />
              </CardSection>

              <CardSection>
                <Input
                  placeholder="Street Name"
                  label="Street Name"
                  value={this.state.userStreet}
                  onChangeText={userStreet => this.setState({ userStreet })}
                />
              </CardSection>


              <CardSection>
                <Input
                  placeholder="City Name"
                  label="City Name"
                  value={this.state.userCity}
                  onChangeText={userCity => this.setState({ userCity })}
                />
              </CardSection>

              <CardSection>
                <Input
                  placeholder="Zip Code"
                  label="Zip Code"
                  value={this.state.userZipCode}
                  onChangeText={userZipCode => this.setState({ userZipCode })}
                />
              </CardSection>

              <CardSection>
                <Input
                  placeholder="State"
                  label="State"
                  value={this.state.userState}
                  onChangeText={userState => this.setState({ userState })}
                />
              </CardSection>

              <Text style={styles.errorTextStyle}>
                {this.state.error}
              </Text>
              
              <Button onPress={this.onButtonPress}>
                Update Profile
              </Button>
            </Card>
        );
    }
}

const  styles = {
  errorTextStyle: {
    fontSize: 15,
    alignSelf: 'center',
    color: 'red'
  }
};

export default UserProfile;
