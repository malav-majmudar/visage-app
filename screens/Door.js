import React from "react";
import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { signOut, getAuth } from "@firebase/auth";
import { getFirestore, collection, getDoc, doc } from "@firebase/firestore";
import app from "../firebase";
import { Image } from "react-native";
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
  Avatar,
} from "./../components/styles";
import Button from "../components/Button";

const Door = ({ navigation, route }) => {
  const auth = getAuth(app);
  const db = getFirestore(app);

  const [image, setImage] = useState("");
  const [url, setURL] = useState("");

  //url = "http://visage-lock.local:8003";

  useEffect(() => {
    const activateStream = async () => {
      link_stream = "";

      await getDoc(doc(db, "stream", "stream_link"))
        .then((res) => res.data())
        .then((link) => {
          link_stream = link["value"];
          console.log("getting link " + link["value"]);
          setURL(link["value"]);
        });
      console.log(link_stream);
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

  const lockDoor = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lock: "lock" }),
    };

    try {
      await fetch(`${url}/lock_door`, requestOptions).then((response) => {
        response.json().then((data) => {
          console.log(data["status"]);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const unlockDoor = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lock: "unlock" }),
    };

    try {
      await fetch(`${url}/lock_door`, requestOptions).then((response) => {
        response.json().then((data) => {
          console.log(data["status"]);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <StatusBar style="light" />
      <InnerContainer>
        <WelcomeContainer>
          <Image
            style={{ width: 300, height: 300 }}
            source={{ uri: "data:image/jpeg;base64, " + image }}
          />
          <Button
            title="Lock Door"
            icon="lock-outline"
            color="#000000"
            onPress={lockDoor}
          />
          <Button
            title="Unlock Door"
            icon="lock-open"
            color="#000000"
            onPress={unlockDoor}
          />
          <Button
            title="Home"
            icon="home"
            color="#000000"
            onPress={() => {
              navigation.navigate("Welcome");
            }}
          />
        </WelcomeContainer>
      </InnerContainer>
    </>
  );
};

export default Door;
