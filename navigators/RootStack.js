import React, {useState} from 'react';

//colors
import {Colors} from './../components/styles';
const {primary, tertiary} = Colors;
//React navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Firebase
import { initializeApp } from '@firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';

//Firebase config

//screens
import Login from './../screens/Login';
import Signup from './../screens/Signup';
import Welcome from './../screens/Welcome';
import CameraPage from '../screens/CameraPage';
import Door from '../screens/Door';
import Users from '../screens/Users';

const Stack = createNativeStackNavigator();

const RootStack = () => {

    return(
        <NavigationContainer>
            <Stack.Navigator 
                    screenOptions={{
                        headerTitle: '',
                        headerTransparent: true,  
                        gestureEnabled: false,
                        headerShown: false
                    }} 
                    initialRouteName="Login">
                
                <Stack.Screen 
                    name="Login" 
                    component={Login} 
                />

                <Stack.Screen
                    name="Signup" 
                    component={Signup} 
                />

                <Stack.Screen
                    name="Welcome" 
                    component={Welcome} 
                />

                <Stack.Screen
                    name="CameraPage" 
                    component={CameraPage}
                />

                <Stack.Screen
                    name="Door" 
                    component={Door}
                />
                <Stack.Screen
                    name="Users" 
                    component={Users}
                />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

 export default RootStack; //= () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [user, setUser] = useState(null); // Track user authentication state
//     const [isLogin, setIsLogin] = useState(true);

//     const auth = getAuth(app);
  
//     useEffect(() => {
//       const unsubscribe = onAuthStateChanged(auth, (user) => {
//         setUser(user);
//       });
  
//       return () => unsubscribe();
//     }, [auth]);
  
    
//     const handleAuthentication = async () => {
//       try {
//         if (user) {
//           // If user is already authenticated, log out
//           console.log('User logged out successfully!');
//           await signOut(auth);
//         } else {
//           // Sign in or sign up
//           if (isLogin) {
//             // Sign in
//             await signInWithEmailAndPassword(auth, email, password);
//             console.log('User signed in successfully!');
//           } else {
//             // Sign up
//             await createUserWithEmailAndPassword(auth, email, password);
//             console.log('User created successfully!');
//           }
//         }
//       } catch (error) {
//         console.error('Authentication error:', error.message);
//       }
//     };
//}