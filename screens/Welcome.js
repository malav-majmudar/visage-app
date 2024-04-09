import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { signOut, getAuth } from '@firebase/auth';
import { getFirestore, collection, getDoc, doc } from '@firebase/firestore'
import app from '../firebase';
import {Image} from 'react-native';
import {decode as atob, encode as btoa} from 'base-64'
// import socket from '../socket';
import { io } from "socket.io-client";

import {
    InnerContainer,
    PageTitle,
    SubTitle,
    StyledFormArea,
    StyledButton,
    ButtonText,
    Line,
    WelcomeContainer,
    WelcomeImage,
    Avatar
} from './../components/styles';
import { Camera, CameraType } from 'expo-camera';
import { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Welcome = ({navigation, route}) => {

    const [image, setImage] = useState("")


    useEffect(() => {

        const activateStream = async () => {

            link_stream = ""

            await getDoc(doc(db, "stream", "stream_link"))
            .then((res) => res.data())
            .then((link) => {
                console.log('getting link ' + link['value'])
                link_stream = link['value']
            })

            const socket = io(link_stream)
            socket.on('connect', function () {
                console.log('connected');
                socket.on('client', function (value) {
                    setImage(value)
                    // setImage(btoa(String.fromCharCode(...new Uint8Array(value))))
                });
            });
        };
        
        activateStream()

    }, [])
    
    const handleSignOut = async () => {
        var response = await signOut(auth)
        console.log(auth)
        navigation.navigate('Login')
    }

    const auth = getAuth(app)
    const db = getFirestore(app)

    return (
        <>
            <StatusBar style="light" /> 
            <InnerContainer>
                <WelcomeContainer>
                        <StyledFormArea> 
                            {<Avatar resizeMode="cover" source={require('./../assets/img1.png')} />}
                                <Line />                                    
                                    <StyledButton onPress={handleSignOut}>
                                        <ButtonText>Logout</ButtonText>
                                    </StyledButton>
                                    <StyledButton onPress={() => {navigation.navigate('CameraPage')}}>
                                        <ButtonText>Camera</ButtonText>
                                    </StyledButton>
                                    <StyledButton onPress={() => {navigation.navigate('Door')}}>
                                        <ButtonText>Door Controls</ButtonText>
                                    </StyledButton>
                        </StyledFormArea>
                </WelcomeContainer>
            </InnerContainer>
        </>
    );
};

export default Welcome;