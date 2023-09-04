import React, { Component, useState, useEffect } from "react";
import { Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { auth, db } from './firebase';
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { Button, Card, CardSection, Input, Spinner } from './common';
import { doc, addDoc, getDocs, getDoc, collection, setDoc } from 'firebase/firestore';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation, Link, Screen, Navigator, NavigationContainer } from '@react-navigation/native';
import AddProfilePic from './AddProfilePic';

const DATA = [
    { label: '3311 Broadway Investors LLC', value: '1', bldgNumber: '3346', streetName: '1st Ave' },
    { label: '4th Ave Loft Owners Association', value: '2', bldgNumber: '', streetName: '35th St'},
    { label: '8 4 8 LLC', value: '3', bldgNumber: '3424', streetName: '3rd Ave' },
    { label: '848 LLC', value: '4', bldgNumber: '3608', streetName: '3rd Ave' },
    { label: '8x8 Investments LLC', value: '5', bldgNumber: '3119', streetName: 'Broadway' },
    { label: 'A1 Auto Tire / Wheel', value: '6', bldgNumber: '3500', streetName: 'Broadway' },
    { label: 'ANITA CARTER LIVING TRUST', value: '7', bldgNumber: '3737', streetName: 'Broadway' },
    { label: 'BARRY WHEELER SACRAMENTO PROPERTIES', value: '8', bldgNumber: '3522', streetName: '2nd Ave' },
    { label: 'BASE CAMP PROPERTIES LLC', value: '9', bldgNumber: '2641', streetName: '35th St' },
    { label: 'BASE CAMP PROPERTIES LLC', value: '10', bldgNumber: '3517', streetName: '2nd Ave' },
    { label: 'BASER FAMILY REVOCABLE 2014 TRUST', value: '11', bldgNumber: '3200', streetName: 'Broadway' },
    { label: 'BETHEL MINISTRIES CHURCH OF GOD IN CHRIST', value: '12', bldgNumber: '3684', streetName: 'Bret Harte Ct' },
    { label: 'BEVERLY KONESKY REVOCABLE TRUST', value: '13', bldgNumber: '3930', streetName: 'Broadway' },
    { label: 'BILL REVOCABLE TRUST', value: '14', bldgNumber: '3718', streetName: '5th Ave' },
    { label: 'BONFARE MARKETS INC', value: '15', bldgNumber: '3120', streetName: 'Broadway' },
    { label: 'BREAD OF LIFE MINISTRIES', value: '16', bldgNumber: '2832', streetName: '34th St' },
    { label: 'VRILAKAS FAMILY TRUST', value: '17', bldgNumber: '3328', streetName: 'Broadway' },
    { label: 'BUDGET REAL ESTATE FUND II LLC', value: '18', bldgNumber: '3430', streetName: 'San Carlos Way' },
    { label: 'RAINBOW BAKING CO OF SAC VALLEY(BBU INC)', value: '19', bldgNumber: '3201', streetName: '6th Ave' },
    { label: 'CITY OF SACRAMENTO', value: '20', bldgNumber: '3930', streetName: '8th Ave' },
    { label: 'CITY OF SACRAMENTO', value: '21', bldgNumber: '3301', streetName: '5th Ave' },
    { label: 'CITY OF SACRAMENTO REDEVELOPMENT AGE SUCCESSOR AGE', value: '22', bldgNumber: '3200', streetName: 'Martin Luther King Blvd' },
    { label: 'CONTEMPO DEFINED BENEFIT PENSION PLAN', value: '23', bldgNumber: '3216', streetName: 'Martin Luther King Blvd' },
    { label: 'CORKY BOB LLC', value: '24', bldgNumber: '3418', streetName: 'Martin Luther King Blvd' },
    { label: 'DALLIN LLC', value: '25', bldgNumber: '3709', streetName: 'Broadway' },
    { label: 'DANIEL PONE 2009 REVOCABLE TRUST', value: '26', bldgNumber: '2921', streetName: '35th St' },
    { label: 'DCR PROPERTIES LLC', value: '27', bldgNumber: '3656', streetName: '5th Ave' },
    { label: 'DECAMILLA FAMILY REVOCABLE TRUST', value: '28', bldgNumber: '3619', streetName: '4th Ave' },
    { label: 'ROMAN CATHOLIC BISHOP OF SACTO', value: '29', bldgNumber: '2549', streetName: '32nd St' },
    { label: 'DODD CONSTANCE M', value: '30', bldgNumber: '', streetName: '5th Ave' },
    { label: 'EARL WITHYCOMBE II FAMILY TRUST', value: '31', bldgNumber: '3733', streetName: 'Broadway' },
    { label: 'ETA GAMMA OMEGA SOROITY INC', value: '32', bldgNumber: '3500', streetName: '2nd Ave' },
];

const { dropDownWidth } = Dimensions.get('window');


const UserProfile = () => {
  const [value, setValue] = React.useState(null);
  const [Focus, setFocus] = React.useState(false);
  const [label, setLabel] = React.useState(null);
  const [bldgNumber, setBldgNumber] = React.useState(null);
  const [streetName, setStreetName] = React.useState(null);
  const [userEmail, setUserEmail] = React.useState();
  const [userId, setUserId] = React.useState();
  const [userName, setUserName] = React.useState(null);
  const [userPhone, setUserPhone] = React.useState();
  const [userHomeNo, setUserHomeNo] = React.useState(null);
  const [setUserCity] = React.useState(null);
  const userCity = 'Sacramento';
  const [userZipCode, setUserZipCode] = React.useState(null);
  const [setUserState] = React.useState(null);
  const userState = 'CA';
  const [tkSubmitError, setTkSubmitError] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  const navigation = useNavigation();

  state = { error: '', loading: false, userTkNo: 0 };

  const email = auth.currentUser.email
  const userDocRef = doc(db,"userProfileCollection", email)
  const [user, setUser] = useState({})
  const [userProfileActive, setUserProfileActive] = useState(false)

  useEffect(() => {
            const getUser = async () => {
              const snap = await getDoc(userDocRef)
              setUser({email, ...snap.data()})
              if(snap.exists()) {
                      setUser(snap.data())
                      setUserProfileActive(true)
                    } else {
                      setUserProfileActive(false)
                    }
            }
            getUser()
  },[])

  onAuthStateChanged(auth, (user) => {
        if (user) {
                 setUserEmail(auth.currentUser.email)
                 setUserId(auth.currentUser.uid)
        } else {
                 setUserEmail()
                 setUserId()
        }
  });

   onButtonPress = async () => {


    // Add a new document with a generated id.
    const docRef =  await setDoc(doc(db, "userProfileCollection", userEmail), {
     userName: label,
     userPhone: userPhone, 
     userHomeNo: bldgNumber,
     userStreet: streetName,
     userCity: userCity, 
     userZipCode: userZipCode,
     userState: userState,
     userEmail: userEmail,
     userTkNo: 0,
     userId: userId
    })
    .then (onCreateAccountSucess)
    .catch(onCreateAccountFail)
  }

  onCreateAccountSucess = () => {
    setLoading(true),
    setTkSubmitError('Profile successfully updated')
  }

  onCreateAccountFail = () => {
    setLoading(true),
    setTkSubmitError('Profile submission failed')
  }


        return (
        <ScrollView>
            <Card>
             <Dropdown
                data={DATA}
                style={[styles.dropdown, Focus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!Focus ? 'Choose your business address' : ' ...'}
                searchPlaceholder="Search"
                value={value}
                label={label}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                onChange={item => {
                    setValue(item.value);
                    setLabel(item.label);
                    setBldgNumber(item.bldgNumber);
                    setStreetName(item.streetName);
                    setFocus(false);
                }}
                renderLeftIcon={() => (
                    <AntDesign
                        style={styles.icon}
                        color={Focus ? 'blue' : 'black'}
                        name="menu-fold"
                        size={30}
                    />
                )}
             />
              <CardSection >
                <Input
                  placeholder="Business Address"
                  label="Name"
                  value={label ? label : user.userName}
                  onChangeText={label => setLabel({ label })}
                />
              </CardSection>

              <CardSection>
                <Input
                  placeholder="Phone Number"
                  label="Phone"
                  value={userPhone ? userPhone : user.userPhone}
                  onChangeText={userPhone => setUserPhone(userPhone)}
                />
              </CardSection>
              
              <CardSection>
                <Input
                  placeholder="Bldg Number"
                  label="Bldg Number"
                  value={bldgNumber ? bldgNumber : user.userHomeNo}
                  onChangeText={bldgNumber => setBldgNumber({ bldgNumber })}
                />
              </CardSection>

              <CardSection>
                <Input
                  placeholder="Street Name"
                  label="Street Name"
                  value={streetName ? streetName : user.userStreet}
                  onChangeText={streetName => setStreetName({ streetName })}
                />
              </CardSection>


              <CardSection>
                <Input
                  placeholder="City Name"
                  label="City Name"
                  value={userCity}
                  onChangeText={userCity => setUserCity({ userCity })}
                />
              </CardSection>

              <CardSection>
                <Input
                  placeholder="Zip Code"
                  label="Zip Code"
                  value={userZipCode ? userZipCode : user.userZipCode}
                  onChangeText={userZipCode => setUserZipCode({ userZipCode })}
                />
              </CardSection>

              <CardSection>
                <Input
                  placeholder="State"
                  label="State"
                  value={userState}
                  onChangeText={userState => setUserState({ userState })}
                />
              </CardSection>

              <Text style={styles.errorTextStyle}>
                {this.state.error}
              </Text>
              
              <Button onPress={this.onButtonPress}>
                Update Profile
              </Button>

            </Card>
        </ScrollView>
        );

}

const styles = StyleSheet.create({
    errorTextStyle: {
      fontSize: 15,
      alignSelf: 'center',
      color: 'red'
    },
    container: {
        backgroundColor: 'white',
        paddingTop: 10,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        top: 5,
        paddingHorizontal: 8,
        paddingBottom: 5,
        width: dropDownWidth,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'green',
        color: 'red',
        left: 22,
        top: 20,
        zIndex: 999,
        paddingHorizontal: 8,
        paddingTop: 1,
        fontSize: 22
    },
    placeholderStyle: {
        fontSize: 18,
    },
    selectedTextStyle: {
        fontSize: 18,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    button: {
        width: 250,
        height: 60,
        backgroundColor: '#3740ff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        marginBottom:12
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 15,
        color: '#fff'
    }
});

export default UserProfile
