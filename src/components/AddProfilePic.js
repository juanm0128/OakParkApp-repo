import React, { Component, useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, Dimensions, TouchableOpacity } from "react-native";
import { query, where } from "firebase/firestore";
import { auth, db } from './firebase';
import { onAuthStateChanged } from "firebase/auth";
import { Button, Card, CardSection, Header, Input, Spinner } from './common';
import { doc, addDoc, getDocs, collection, setDoc } from 'firebase/firestore';
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation, Link, Screen, Navigator, NavigationContainer } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

const AddProfilePic = ({navigation}) => {
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

    return (
        <View
            style={{
                flexDirection: 'column',
                alignItems: 'center',
                padding: 40,
            }}
        >

            <View>
                            <Image source={{ uri: image != null ? image : 'https://i.pinimg.com/222x/57/70/f0/5770f01a32c3c53e90ecda61483ccb08.jpg'}} style={{ width: 300, height: 300, borderRadius: 10 }} onChange={image => setImage(image)}/>
                            <TouchableOpacity onPress={pickImage}>
                            <Text style={{textAlign: 'center', marginTop: 10, color: '#007aff', fontSize: 17, marginBottom: 25}}>
                                Upload image
                            </Text>
                            </TouchableOpacity>
                            <Button>
                                Save
                            </Button>

            </View>
        </View>
    );
}

export default AddProfilePic