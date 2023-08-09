import React, { useState, useEffect } from 'react';
import {StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, Platform } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from './firebase';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Card, Button, CreateTicketDetailsScreen, CreateTicketMenuScreen, CardSection, Input, Spinner, Header, MultiLineInput } from './common';
import { ImageButton } from './common/ImageButton';
import { TextInput } from 'react-native-gesture-handler';
import { doc, addDoc, getDoc, getDocs, collection, setDoc, updateDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';

const DATA = [
    { label: 'Graffiti Removal', value: '1' },
    { label: 'Trash can Emptying', value: '2'},
    { label: 'Trash can Damage', value: '3' },
    { label: 'Illegal Dumping', value: '4' },
    { label: 'Litter Pickup', value: '5' },
    { label: 'Banner Damage', value: '6' },
    { label: 'Other', value: '7' },
];

const { dropDownWidth } = Dimensions.get('window');

const CreateTicketScreen = () => {
    const [value, setValue] = React.useState(null);
    const [Focus, setFocus] = React.useState(false);
    const [probStatement, setProbStatement] = React.useState(null);
    const [location, setLocation] = React.useState(null);
    const [ticketNo, setTicketNo] = React.useState(null);
    const [issueDescr, setIssueDescr] = React.useState(null);
    const [userEmail, setUserEmail] = React.useState();
    const [userId, setUserId] = React.useState();
    const [tkSubmitError, setTkSubmitError] = React.useState('');
    const [loading, setLoading] = React.useState(true);
    const [userDateTime, setUserDateTime] = React.useState('');
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
    };
 
    const myDateTime = () => {
      //Get Current Date
      var date = new Date().getDate();
      //Get Current Month
      var month = new Date().getMonth() + 1;
      //Get Current Year
      var year = new Date().getFullYear();
      //Get Current Time Hours
      var hours = new Date().getHours();
      //Get Current Time Minutes
      var min = new Date().getMinutes();
      //Get Current Time Seconds
      var sec = new Date().getSeconds();
   
      var finalObject = date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec;
   
      setUserDateTime(finalObject);
    }

    const email = auth.currentUser.email
    const userDocRef = doc(db,"userProfileCollection", email)
    const [user, setUser] = useState({})
      
    useEffect(() => {
          const getUser = async () => {
            const snap = await getDoc(userDocRef)
            setUser({email, ...snap.data()})
          }
          getUser()
    },[])

    const renderLabelItem = () => {
        if (value || Focus) {
            return (
                <Text style={[styles.label, Focus]}>
                    Please select the issue you are facing.
                </Text>
            );
        }
        return null;
    };

    onAuthStateChanged (auth, (user) => { 
        if (user) {
         setUserEmail(auth.currentUser.email)
         setUserId(auth.currentUser.uid)
         myDateTime();
        } else {
         setUserEmail()
         setUserId()
        }
    });

    const onButtonPress = async () => { 
        setTkSubmitError('Ticket submision Initial phase')
    
        var oldTicketNo = user.userTkNo;
        var newTicketNo = oldTicketNo + 1;

        const docSnap = await getDoc(userDocRef);

        await updateDoc(userDocRef, {
        userTkNo: newTicketNo
        });

        // Generate random number and assign it as ticket number
        // Another method is to save number in userProfile and increment it for every ticket
        const LclTicketNo = Math.floor(Math.random() * 1000000 + 1);
        setTicketNo(LclTicketNo)

        const docRef =  await addDoc(collection(db, "ticketCollection"), {
         issueDescr: issueDescr,
         probStatement: probStatement,
         userEmail: userEmail,
         userId: userId,
         userTkNo: newTicketNo,
         userTkState: 'New',
         userDateTime:userDateTime
        })
        .then (onSubmitTicketSucess)
        .catch(onSubmitTicketFail)
    }
    
    const onSubmitTicketSucess = () => {
        setLoading(true),
        setTkSubmitError('Ticket successfully submitted')
    }
    
    const onSubmitTicketFail = () => {
        setLoading(true),
        setTkSubmitError('Ticket submision failed')
    }

    //{renderLabelItem()}

        return (
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
                placeholder={!Focus ? ' What is your issue?' : '...'}
                searchPlaceholder="Search"
                value={value}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                onChange={item => {
                    setValue(item.value);
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

            <CardSection>  
             <MultiLineInput
                placeholder="Address"
                label="Location"
                value={location}
                onChangeText={location => setLocation(location)}
             />
            </CardSection>
            
            <CardSection>
            <MultiLineInput
                placeholder="Problem Statement"
                label="Problem Statement"
                value={probStatement}
                onChangeText={probStatement => setProbStatement(probStatement)}
            />
            </CardSection>

           

            <CardSection>  
             <MultiLineInput
                placeholder="Issue Description"
                label="Issue Description"
                value={issueDescr}
                onChangeText={issueDescr => setIssueDescr(issueDescr)}
             />
            </CardSection>

            <CardSection>
             <View>
                <ImageButton onPress={pickImage}>
                    Upload an image (optional)
                </ImageButton>
                {image!=null && <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />}
              </View>
            </CardSection>

            
            <Text style={styles.errorTextStyle}>
                {tkSubmitError}
            </Text>

            <Button onPress={onButtonPress}>
                Submit Ticket
            </Button>
        </Card>
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
        fontSize: 16,
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
 
export default CreateTicketScreen