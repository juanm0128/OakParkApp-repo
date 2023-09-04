// Get ticket document id from view ticket screen
// Pull the related ticket from ticketCollection
// Provide option to update Issue Description or comments field (it does not exist right now)
// No other fields are updated
import React, { Component, useState, useEffect } from "react";
import { Text, View, StyleSheet, Dimensions, Image } from 'react-native';
import { query, where } from "firebase/firestore";
import { auth, db } from './firebase';
import { onAuthStateChanged } from "firebase/auth";
import { Card, Button, CreateTicketDetailsScreen, CreateTicketMenuScreen, CardSection, Input, Spinner, Header, MultiLineInput } from './common';
import { doc, addDoc, getDocs, collection, setDoc } from 'firebase/firestore';
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation, Screen, Navigator, NavigationContainer } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker';
import { ImageButton } from './common/ImageButton';
import {DrawerActions} from '@react-navigation/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import DrawerNavigator from './DrawerNavigator';


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

const UpdateTicketByUserScreen = ({navigation, route}) => {
    const [value, setValue] = React.useState(null);
        const [Focus, setFocus] = React.useState(false);
        const [problemStatement, setProbStatement] = React.useState(null);
        const [location, setLocation] = React.useState(null);
        const [ticketNo, setTicketNo] = React.useState(null);
        const [issueDescription, setIssueDescr] = React.useState(null);
        const [setUserEmail] = React.useState();
        const [setUserId] = React.useState();
        const [tkSubmitError, setTkSubmitError] = React.useState('');
        const [loading, setLoading] = React.useState(true);
        const [userDateTime, setUserDateTime] = React.useState('');
        const [image, setImage] = useState(null);
        const [label, setLabel] = useState(null);

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
        setTkSubmitError('Ticket submission pending...')

        if(issueDescription == null && problemStatement == null && label == null){
            onSubmitTicketIsNull()
        } else {
            const docRef = doc(db, "ticketCollection", refId)
            setDoc(docRef, {
            issueLabel: value,
            issueDescr: issueDescription,
            probStatement: problemStatement,
            userEmail: userEmail,
            userId: userId,
            userTkNo: userTkNo,
            userTkState: 'New',
            userDateTime:userDateTime
            })
            .then (onSubmitTicketSucess)
            .catch(onSubmitTicketFail)
        }


    }

    const onSubmitTicketSucess = () => {
        setLoading(true),
        setTkSubmitError('Ticket successfully edited')
    }

    const onSubmitTicketFail = () => {
        setLoading(true),
        setTkSubmitError('Ticket submission failed')
    }

    const onSubmitTicketIsNull = () => {
        setLoading(true),
        setTkSubmitError('Please edit one or more sections before submitting.')
    }

    const { userTkNo, probStatement, userTkState, userEmail, issueDescr, refId, userId, issueLabel } = route.params;
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
                                    placeholder={!Focus ? issueLabel ? issueLabel : 'Edit ticket' : ' ... '}
                                    searchPlaceholder="Search"
                                    value={value}
                                    onFocus={() => setFocus(true)}
                                    onBlur={() => setFocus(false)}
                                    onChange={item => {
                                        setValue(item.value);
                                        setLabel(item.label);
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
                                    placeholder={probStatement}
                                    label="Problem Statement"
                                    value={problemStatement}
                                    onChangeText={problemStatement => setProbStatement(problemStatement)}
                                />
                                </CardSection>

                    <CardSection>
                                 <MultiLineInput
                                    placeholder={issueDescr}
                                    label="Issue Description"
                                    value={issueDescription}
                                    onChangeText={issueDescription => setIssueDescr(issueDescription)}
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


                                <Text></Text>

                                <Button onPress={onButtonPress}>
                                    Submit Ticket
                                </Button>

                                <Text style={styles.errorTextStyle}>
                                    {tkSubmitError}
                                </Text>
                </Card>
            </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    errorTextStyle: {
        fontSize: 15,
        alignSelf: 'center',
        color: 'red',
        marginTop: 20
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
    headerTextStyle: {
        fontSize: 24,
    },
    inputSearchStyle: {
            height: 40,
            fontSize: 16,
    },
    iconStyle: {
            width: 20,
            height: 20,
    },
});

export default UpdateTicketByUserScreen
