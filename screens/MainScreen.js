import React, { useEffect } from "react"
import { View, StyleSheet, Text } from "react-native"
import MapView from "react-native-maps"
const GOOGLE_DIRECTION_API_KEY = "AIzaSyC2lJ_zm7nE5mU0252mbfbJd1BebTxTDu8"

const MainScreen = () => {
    // fetch directions and decode polylines
    const getDirections = async (startLoc, destinationLoc) => {
        try {
            let resp = await fetch(
                `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${GOOGLE_DIRECTION_API_KEY}`
            )
            let respJson = await resp.json()

            console.log("JSON response: ", respJson)
            // let points = Polyline.decode(respJson.routes[0].overview_polyline.points)
            // let coords = points.map((point, index) => {
            //     return {
            //         latitude: point[0],
            //         longitude: point[1],
            //     }
            // })
            // this.setState({ coords: coords })
            return coords
        } catch (error) {
            console.log(error)
            return error
        }
    }
    useEffect(() => {
        const getDirectionsAPI = async () => {
            await getDirections()
        }
        // getDirectionsAPI()
    })
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
