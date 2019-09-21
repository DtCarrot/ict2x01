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

const AuthStack = createStackNavigator({
    SignIn: SignInScreen,
})

const DrawerNavigator = createDrawerNavigator(
    {
        Home: {
            screen: MainScreen,
        },
    },
    {
        initialRouteName: "Home",
        contentComponent: DrawerScreen,
        drawerWidth: 300,
    }
)

export default createAppContainer(
    createStackNavigator(
        {
            // You could add another route here for authentication.
            // Read more at https://reactnavigation.org/docs/en/auth-flow.html
            AuthLoading: AuthLoadingScreen,
            // Auth: AuthStack,
            // SignUp: SignUpScreen,
            // Home: MainScreen,
            // Main: MainTabNavigator,
            DrawerNavigator: { screen: DrawerNavigator },
        },
        {
            defaultNavigationOptions: ({ navigation }) => ({
                title: "ReactNavigation", // Title to appear in status bar
                headerLeft: (
                    <TouchableOpacity
                        onPress={() => {
                            console.log("On click")
                            navigation.dispatch(DrawerActions.toggleDrawer())
                        }}
                    >
                        {/* <MenuImage style="styles.bar" navigation={navigation} /> */}
                        <Text>Slider</Text>
                    </TouchableOpacity>
                ),
                headerStyle: {
                    backgroundColor: "#333",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    fontWeight: "bold",
                },
            }),
        }
    )
)
