import React, { useState, useEffect, useRef, useCallback } from "react"
import { Image, View, StyleSheet, Text } from "react-native"
import * as Permissions from "expo-permissions"
import BottomBar from "../components/map/BottomBar"
import { SearchBarProvider } from "../components/search/SearchBarContext"
import SearchBarOverlay from "../components/search/SearchBarOverlay"
import MapSelector from "../components/map/MapSelector"

const MainScreen = () => {
    useEffect(() => {
        const _getLocationAsync = async () => {
            const { status } = await Permissions.askAsync(Permissions.LOCATION)
            if (status !== "granted") {
                console.log("Denied")
            }
        }
        _getLocationAsync()
    }, [])

    return (
        <SearchBarProvider>
            <View style={styles.container}>
                <SearchBarOverlay />
                <MapSelector />
                <BottomBar />
            </View>
        </SearchBarProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 12,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ecf0f1",
    },
    text: {
        textAlign: "center",
    },
    calloutOverlay: {
        width: 300,
        height: 70,
        borderColor: "#000",
        borderWidth: 2,
        backgroundColor: "#fff",
        borderRadius: 40,
    },
})

export default MainScreen
