import React, { Component, useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { query, where } from "firebase/firestore";
import { auth, db } from './firebase';
import { onAuthStateChanged } from "firebase/auth";
import { Button, Card, CardSection, Header, Input, Spinner } from './common';
import { doc, addDoc, getDocs, collection, setDoc } from 'firebase/firestore';
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { ScrollView } from "react-native-gesture-handler";

const ViewTicketScreen = () => {
    const [userEmail, setUserEmail] = React.useState();
    const [userId, setUserId] = React.useState();  
    const [totalTickets, setTotalTickets] = useState();
    const [user, setUser] = useState({})
    const [newTkArray, setNewTkArray] = useState([])
    const [viewTckError, setViewTckError] = React.useState('');

    useEffect(() => { 
       const pullTicketData = async () => {
         const q = query(collection(db, "ticketCollection"), where("userEmail", "==", auth.currentUser.email));
         const data = await getDocs(q);
         setTotalTickets(data.size)
         setNewTkArray(data.docs)
        }

       pullTicketData();
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

    return (
            <ScrollView>
                <Text style={styles.headerTextStyle}> ********* Total Tickets: {totalTickets} ********* </Text>
                <Text style={styles.headerTextStyle}> ********************************** </Text>

                {newTkArray && newTkArray.map((element) => {
                    return (
                      <View key={element.get('userTkNo')}>
                        <Text style={styles.selectedTextStyle}> Ticket Id: {element.get('userTkNo')} </Text>
                        <Text style={styles.selectedTextStyle}> Ticket State: {element.get('userTkState')} </Text>
                        <Text style={styles.selectedTextStyle}> User Email: {element.get('userEmail')} </Text>
                        <Text style={styles.selectedTextStyle}> Problem Statement: {element.get('probStatement')} </Text>
                        <Text style={styles.errorTextStyle}>
                           {viewTckError}
                        </Text>
                        <Button> Update Ticket </Button>
                      </View>
                    );
                  })
                }
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
        color: 'red'
    },
    selectedTextStyle: {
        fontSize: 18,
    },
    headerTextStyle: {
        fontSize: 24,
    },
});

export default ViewTicketScreen;