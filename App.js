import { AppLoading } from "expo"
import { Asset } from "expo-asset"
import * as Font from "expo-font"
import React, { useState, useEffect } from "react"
import { Platform, StatusBar, StyleSheet, View } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { mapping, light as lightTheme } from "@eva-design/eva"
import AppNavigator from "./navigation/AppNavigator"
import { ApplicationProvider } from "react-native-ui-kitten"
import NavigationService from "./navigation/NavigationService"

export default function App(props) {
    const [isReady, setReady] = useState(false)
    const [isLoadingComplete, setLoadingComplete] = useState(false)
    useEffect(() => {
        const initializeFont = async () => {
            await Font.loadAsync({
                Roboto: require("native-base/Fonts/Roboto.ttf"),
                Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
                ionicons: require("@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf"),
            })
            setReady(true)
        }
        initializeFont()
    }, [])

    if (!isLoadingComplete && !props.skipLoadingScreen) {
        console.log("Loading")
        return (
            <AppLoading
                startAsync={loadResourcesAsync}
                onError={handleLoadingError}
                onFinish={() => handleFinishLoading(setLoadingComplete)}
            />
        )
    } else {
        if (!isReady) {
            console.log("Still loading")
            return <AppLoading />
        }
        return (
            <View style={styles.container}>
                {Platform.OS === "ios" && <StatusBar barStyle="default" />}
                <AppNavigator
                    ref={navigationRef => {
                        NavigationService.setTopLevelNavigator(navigationRef)
                    }}
                />
            </View>
        )
    }
}

async function loadResourcesAsync() {
    await Promise.all([
        Asset.loadAsync([
            require("./assets/images/robot-dev.png"),
            require("./assets/images/robot-prod.png"),
        ]),
        Font.loadAsync({
            // This is the font that we are using for our tab bar
            ...Ionicons.font,
            // We include SpaceMono because we use it in HomeScreen.js. Feel free to
            // remove this if you are not using it in your app
            "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
        }),
    ])
}

function handleLoadingError(error) {
    // In this case, you might want to report the error to your error reporting
    // service, for example Sentry
    console.warn(error)
}

function handleFinishLoading(setLoadingComplete) {
    setLoadingComplete(true)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
})

console.log("Loading..")
