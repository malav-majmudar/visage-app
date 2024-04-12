import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { getAuth, getReactNativePersistence } from '@firebase/auth';

import { signInWithEmailAndPassword } from '@firebase/auth';
import app from '../firebase';

//formik
import { Formik } from 'formik';

//icons
import {Octicons, Ionicons, Fontisto} from '@expo/vector-icons';

import {
    Colors,
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFormArea,
    LeftIcon,
    StyledInputLabel,
    StyledTextInput,
    RightIcon,
    StyledButton,
    ButtonText,
    MsgBox,
    Line,
    ExtraText,
    ExtraView,
    TextLink,
    TextLinkContent
} from './../components/styles';
import { View } from 'react-native';
import MyTextInput from '../components/MyTextInput';

//Colors
const {brand, darkLight, primary} = Colors;

//keyboard avoiding wrapper
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

const Login = ({navigation, route}) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [alert, setAlert] = useState('...')
    const auth = getAuth(app)

    const signIn = async (email, password) => {
        try {
            let response = await signInWithEmailAndPassword(auth, email, password)
            console.log(response)
            if (response && response.user) {
                console.log("Success: Authenticated successfully")
                setAlert("...")
                console.log(auth)
                navigation.navigate('Welcome')
                // navigation.navigate('Welcome', {id: 5})

            }
        } catch (e) {
            console.log(e)
            setAlert("Unable to log in")
        }
    }


    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer login={true}>
                <StatusBar style="dark" /> 
                <InnerContainer>
                    <PageLogo resizeMode="cover" source={require('./../assets/img1.png')} />
                    <PageTitle>Visage</PageTitle>
                    <SubTitle>Account Login</SubTitle>

                    <Formik
                        initialValues={{email: '', password: ''}}
                        onSubmit={(values) => {
                            console.log(values);
                            signIn(values['email'],values['password'])

                            // navigation.navigate('Welcome');
                        }}
                    >{({handleChange, handleBlur, handleSubmit, values}) => (<StyledFormArea>
                        <MyTextInput 
                            label="Email Address"
                            icon="mail"
                            placeholder="abc@gmail.com"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            keyboardType="email-address"
                        />
                        <MyTextInput 
                            label="Password"
                            icon="lock"
                            placeholder="* * * * * * *"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            secureTextEntry={hidePassword}
                            isPassword={true}
                            hidePassword={hidePassword}
                            setHidePassword={setHidePassword}
                        />
                        <MsgBox>{alert}</MsgBox>
                        <StyledButton onPress={handleSubmit}>
                            <ButtonText>Login</ButtonText>
                        </StyledButton>
                        <Line />
                        <ExtraView>
                            <ExtraText>Don't have an account already? </ExtraText>
                            <TextLink onPress={() => navigation.navigate('Signup')}>
                                <TextLinkContent>Signup</TextLinkContent>
                            </TextLink>
                        </ExtraView>
                    </StyledFormArea>)}

                    </Formik>
                </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
};

export default Login;