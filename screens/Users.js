import React from "react";
import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import app from "../firebase";
import { Image, Text, View } from "react-native";
import { decode as atob, encode as btoa } from "base-64";

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
  Avatar,
} from "./../components/styles";

const Users = ({ navigation, route }) => {
    const [users, setUsers] = useState({})
    useEffect(() => {
        const getUsers = async () => {
            try {
                await fetch('http://192.168.1.180:8001/facial_recognition/get_users').then((response) => {
                    response.json().then((data) => {
                        setUsers(data);
                    });
                });
            }
            catch (error) {
                console.log(error);
            }
        }
        getUsers();
    }, []);
    return (
        <>
            <StatusBar style="light" /> 
                <InnerContainer>
                    <WelcomeContainer>
                        <View>
                            {Object.entries(users).map(([userName, userImage]) => (
                                <View key={userName}>
                                    <Image style={{width: 100, height: 100}} source={{ uri: 'data:image/jpeg;base64, ' + userImage }}/>
                                    <Text>{userName}</Text>
                                </View>
                            ))}
                        </View>
                        <StyledButton onPress={() => {navigation.navigate('CameraPage')}}>
                            <ButtonText>Add User</ButtonText>
                        </StyledButton>
                        <StyledButton onPress={() => {navigation.navigate('Welcome')}}>
                            <ButtonText>Home</ButtonText>
                        </StyledButton>
                    </WelcomeContainer>
                </InnerContainer>
        </> 
    );
};

export default Users;
