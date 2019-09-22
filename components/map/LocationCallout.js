import React from "react"
import MapView from "react-native-maps"
import { Text } from "native-base"
import { Image, View, StyleSheet } from "react-native"

const LocationCallout = () => (
    <MapView.Callout tooltip={true}>
        <View style={styles.calloutOverlay}>
            <Text style={styles.text}>{`You are here:\nNanyang Polytechnic`}</Text>
        </View>
    </MapView.Callout>
)

const styles = StyleSheet.create({
    calloutOverlay: {
        width: 260,
        height: 70,
        borderColor: "#000",
        borderWidth: 2,
        backgroundColor: "#fff",
        borderRadius: 40,
    },
    text: {
        marginTop: 10,
        fontSize: 16,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
})

export default LocationCallout
