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

const AuthStack = createStackNavigator(
    {
        SignIn: SignInScreen,
        SignUp: SignUpScreen,
    },
    {
        headerMode: "none",
    }
)

const JourneyStack = createStackNavigator(
    {
        Journey: JourneyScreen,
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
        // drawerWidth: 300,
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
            Journey: JourneyStack,
            // SignUp: SignUpScreen,
            // Home: MainScreen,
            // Main: MainTabNavigator,
            DrawerNavigator: { screen: DrawerNavigator },
        },
        {
            headerMode: "none",
            title: "Main",
            // initialRouteName: "AuthLoading",
            initialRouteName: "Journey",
        }
    )
)
