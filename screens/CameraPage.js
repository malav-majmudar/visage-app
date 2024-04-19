import React from "react";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { Formik } from "formik";
import {
  Colors,
  InnerContainer,
  PageTitle,
  SubTitle,
  StyledFormArea,
  StyledButton,
  ButtonText,
  Line,
  WelcomeContainer,
} from "../components/styles";
import { Camera, CameraType } from "expo-camera";
import { useState, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import Button from "../components/Button";
import MyTextInput from "../components/MyTextInput";

//Colors
const { brand, darkLight, primary } = Colors;

//keyboard avoiding wrapper
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";

const CameraPage = ({ navigation }) => {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [image, setImage] = useState(null);
  const [nameInput, setNameInput] = useState(false);
  const cameraRef = useRef(null);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const addUser = async (requestOptions) => {
    try {
      await fetch(
        `http://192.168.1.180:8001/facial_recognition/add_user`,
        requestOptions
      ).then((response) => {
        if (response.status === 201) {
          console.log("Added User");
          navigation.navigate("Welcome");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  function CameraView() {
    return (
      <>
        <StatusBar style="light" />
        <View style={styles.container}>
          <View style={styles.topControls}>
            <Button
              title="Cancel"
              icon="cancel"
              color="#f1f1f1"
              onPress={() => {
                navigation.navigate("Users");
              }}
            />
          </View>
          {!image ? (
            <Camera
              style={styles.camera}
              type={Camera.Constants.Type.front}
              ref={cameraRef}
            ></Camera>
          ) : (
            <Image source={{ uri: image }} style={styles.takenImage} />
          )}
        </View>
        <View style={styles.controls}>
          {!image ? (
            <Button icon="camera-alt" onPress={takePicture} />
          ) : (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 50,
                  padding: 10,
                }}
              >
                <Button
                  title="Retake"
                  icon="redo"
                  color="#f1f1f1"
                  onPress={() => setImage(null)}
                />
                <Button
                  title="Use Photo"
                  icon="check"
                  color="#f1f1f1"
                  onPress={() => {
                    setNameInput(true);
                  }}
                />
              </View>
            </View>
          )}
        </View>
      </>
    );
  }

  function NameInputView() {
    return (
      <KeyboardAvoidingWrapper>
        <View>
          <StatusBar style="dark" />
          <InnerContainer>
            <Formik
              initialValues={{ name: "" }}
              onSubmit={(values) => {
                console.log(values);
                const formData = new FormData();
                formData.append("image", {
                  uri: image,
                  type: "image/jpeg",
                  name: `${values.name}.jpg`,
                });
                const jsonData = { name: `${values.name}` };
                formData.append("json", {
                  string: JSON.stringify(jsonData),
                  type: "application/json",
                });
                const requestOptions = {
                  method: "POST",
                  headers: { "Content-Type": "multipart/form-data" },
                  body: formData,
                };
                console.log(image);
                console.log(formData);
                addUser(requestOptions);

                // navigation.navigate('Welcome');
              }}
            >
              {({ handleChange, handleBlur, handleSubmit, values }) => (
                <StyledFormArea>
                  <MyTextInput
                    label="Name"
                    icon="ellipsis"
                    placeholder="Enter User's Name"
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                    value={values.name}
                  />
                  <StyledButton onPress={handleSubmit}>
                    <ButtonText>Add User</ButtonText>
                  </StyledButton>
                  <StyledButton
                    onPress={() => {
                      setNameInput(false);
                    }}
                  >
                    <ButtonText>Back</ButtonText>
                  </StyledButton>
                  <StyledButton
                    onPress={() => {
                      navigation.navigate("Users");
                    }}
                  >
                    <ButtonText>Cancel</ButtonText>
                  </StyledButton>
                </StyledFormArea>
              )}
            </Formik>
          </InnerContainer>
        </View>
      </KeyboardAvoidingWrapper>
    );
  }

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  if (!nameInput) {
    return <CameraView />;
  } else {
    return <NameInputView />;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#000",
    padding: 8,
  },
  camera: {
    flex: 5,
    borderRadius: 20,
  },
  takenImage: {
    flex: 5,
    borderRadius: 20,
    transform: [{ scaleX: -1 }],
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  controls: {
    flex: 0.1,
    backgroundColor: "#000",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  topControls: {
    flex: 0.3,
    backgroundColor: "#000",
  },
});

export default CameraPage;
