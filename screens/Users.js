import React from "react";
import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Image, Text, View, Alert, StyleSheet } from "react-native";

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

const Users = ({ navigation, route }) => {
  const url = "http://192.168.1.180:8001/facial_recognition";
  const [users, setUsers] = useState({});
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    const getUsers = async () => {
      try {
        await fetch(`${url}/get_users`).then((response) => {
          response.json().then((data) => {
            setUsers(data);
          });
        });
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  const deleteUserAlert = (user) => {
    Alert.alert(
      `Remove ${user}?`,
      `Are you sure you want to continue? ${user} will be permanently deleted`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
          isPreferred: false,
        },
        { text: "Confirm", onPress: () => deleteUser(user), isPreferred: true },
      ]
    );
  };
  const deleteUser = async (user) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: `${user}` }),
    };

    try {
      await fetch(`${url}/remove_user`, requestOptions).then((response) => {
        if (response.status === 200) {
          console.log("Deleted User");
          navigation.navigate("Welcome");
        }
      });
    } catch (error) {
      console.log(error);
    }
    console.log(`${user} deleted`);
  };

  return (
    <>
      <StatusBar style="light" />
      <InnerContainer>
        <WelcomeContainer>
          {edit ? (
            <Button
              title="Cancel Edit"
              icon="edit-off"
              color="#000000"
              onPress={() => setEdit(false)}
            />
          ) : (
            <Button
              title="Edit"
              icon="edit"
              color="#000000"
              onPress={() => setEdit(true)}
            />
          )}
          <View style={styles.container}>
            {Object.entries(users).map(([userName, userImage]) => (
              <View key={userName}>
                <View style={styles.imageContainer}></View>
                <Image
                  style={styles.registeredFaces}
                  source={{ uri: "data:image/jpeg;base64, " + userImage }}
                />
                <View style={styles.textContainer}>
                  <Text>{userName}</Text>
                  {edit ? (
                    <Button
                      title="Delete"
                      icon="trash-can"
                      color="#000000"
                      iconFamily="community"
                      onPress={() => deleteUserAlert(userName)}
                    />
                  ) : (
                    <View></View>
                  )}
                </View>
              </View>
            ))}
          </View>
          <Button
            title="Add User"
            icon="add-circle"
            color="#000000"
            onPress={() => {
              navigation.navigate("CameraPage");
            }}
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
const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    alignItems: "center",
    margin: 10,
  },
  registeredFaces: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginRight: 10
  },
  imageName: {
    marginTop: 5,
  },
  textContainer: {
    marginTop: 10,
    alignItems: "center",
  },
});
export default Users;
