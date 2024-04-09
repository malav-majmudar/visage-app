import React from "react";
import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { signOut, getAuth } from "@firebase/auth";
import { getFirestore, collection, getDoc, doc } from "@firebase/firestore";
import app from "../firebase";
import { Image } from "react-native";

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

const Door = ({navigation, route}) => {
    const [image, setImage] = useState("");

    useEffect(() => {
      const activateStream = async () => {
        link_stream = "";

        await getDoc(doc(db, "stream", "stream_link"))
          .then((res) => res.data())
          .then((link) => {
            console.log("getting link " + link["value"]);
            link_stream = link["value"];
          });

        const socket = io(link_stream);
        socket.on("connect", function () {
          console.log("connected");
          socket.on("client", function (value) {
            setImage(value);
            // setImage(btoa(String.fromCharCode(...new Uint8Array(value))))
          });
        });
      };

      activateStream();
    }, []);

    return (
        <>
            <Image style={{width: 300, height: 300}} source={{uri: 'data:image/jpeg;base64, ' + image}}/>
            <StyledButton onPress={() => {navigation.navigate('Welcome')}}>
                <ButtonText>Home</ButtonText>
            </StyledButton>
        </>
        
    );
}

export default Door;