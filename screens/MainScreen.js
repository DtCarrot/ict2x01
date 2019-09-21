import React from "react"
import { View, StyleSheet, Text } from "react-native"
import MapView from "react-native-maps"

const MainScreen = () => {
    const mapRegion = {
        latitude: 25.78825,
        longitude: -102.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }
    return (
        <View style={styles.container}>
            <Text>Hello</Text>
            <MapView style={{ alignSelf: "stretch", height: 400 }} region={mapRegion} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ecf0f1",
    },
})

export default MainScreen
