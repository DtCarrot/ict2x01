import React from "react"
import { Text, TouchableOpacity } from "react-native"
import {
    createAppContainer,
    createSwitchNavigator,
    createDrawerNavigator,
    DrawerActions,
} from "react-navigation"
import { createStackNavigator } from "react-navigation-stack"

import MainTabNavigator from "./MainTabNavigator"
import SignInScreen from "../screens/SignInScreen"
import SignUpScreen from "../screens/SignUpScreen"
import HomeScreen from "../screens/HomeScreen"
import AuthLoadingScreen from "../screens/AuthLoadingScreen"
import MainScreen from "../screens/MainScreen"
import DrawerScreen from "../screens/Menu"
import JourneyScreen from "../screens/JourneyScreen"
import FinishedJourneyScreen from "../screens/FinishedJourney"

import * as firebase from "firebase"

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCHAJmBB6hMn8dnxDO3lMZkWlvazk3wFGI",
    projectId: "ict2101-22ad5",
    authDomain: "ict2101-22ad5.firebaseapp.com",
    databaseURL: "https://ict2101-22ad5.firebaseio.com",
    storageBucket: "ict2101-22ad5.appspot.com",
}

firebase.initializeApp(firebaseConfig)

const AuthStack = createStackNavigator(
    {
        SignIn: SignInScreen,
        SignUp: SignUpScreen,
    },
    {
        headerMode: "none",
    }
)

const JourneyStack = createDrawerNavigator(
    {
        Journey: JourneyScreen,
        FinishedJourney: FinishedJourneyScreen,
    },
    {
        initialRouteName: "Journey",
        // initialRouteName: "FinishedJourney",
        headerMode: "none",
        drawerWidth: 220,
        contentComponent: props => <DrawerScreen {...props} />,
    }
)

const JourneyNavigator = createStackNavigator(
    {
        JourneyStack: {
            screen: JourneyStack,
            headerMode: "none",
        },
    },
    {
        headerMode: "none",
    }
)

const DrawerStack = createDrawerNavigator(
    {
        Home: {
            screen: MainScreen,
        },
    },
    {
        contentComponent: props => <DrawerScreen {...props} />,
        drawerWidth: 220,
        // headerMode: "none",
    }
)

const DrawerNavigator = createStackNavigator(
    {
        DrawerStack: {
            screen: DrawerStack,
            headerMode: "none",
        },
    },
    {
        headerMode: "none",
    }
)
export default createAppContainer(
    createStackNavigator(
        {
            // You could add another route here for authentication.
            // Read more at https://reactnavigation.org/docs/en/auth-flow.html
            AuthLoading: AuthLoadingScreen,
            Auth: AuthStack,
            // JourneyNavigator: { screen: JourneyNavigator },
            JourneyStack: JourneyStack,
            // SignUp: SignUpScreen,
            // Home: MainScreen,
            // Main: MainTabNavigator,
            DrawerNavigator: { screen: DrawerNavigator },
        },
        {
            headerMode: "none",
            title: "Main",
            initialRouteName: "AuthLoading",
            // initialRouteParams: "Home",
            // initialRouteName: "SignUp",
            // initialRouteParams: "JourneyStack",
            // initialRouteName: "JourneyStack",
            // initialRouteName: "JourneyStack",
        }
    )
)
