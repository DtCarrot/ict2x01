import React, { useState, useEffect, useRef, useCallback } from "react"
import { Image, View, StyleSheet, Text } from "react-native"
import MapView from "react-native-maps"
import LocationCallout from "../components/map/LocationCallout"
import * as Permissions from "expo-permissions"
import BottomBar from "../components/map/BottomBar"
const GOOGLE_DIRECTION_API_KEY = "AIzaSyC2lJ_zm7nE5mU0252mbfbJd1BebTxTDu8"

const MainScreen = () => {
    const currentLocMarker = useRef()
    const [markerLoaded, setMarkerLoaded] = useState(false)
    useEffect(() => {
        console.log("Marker status: ", markerLoaded)
        if (markerLoaded) {
            // console.log(currentLocMarker.current)
            currentLocMarker.current.showCallout()
        }
    }, [markerLoaded])
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
    useEffect(() => {
        const _getLocationAsync = async () => {
            const { status } = await Permissions.askAsync(Permissions.LOCATION)
            if (status !== "granted") {
                console.log("Denied")
            }
        }
        _getLocationAsync()
    }, [])
    const mapRegion = {
        latitude: 1.29027,
        longitude: 103.851959,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }

    return (
        <View style={styles.container}>
            <Text>Hello</Text>
            <MapView style={{ alignSelf: "stretch", flex: 1 }} region={mapRegion} minZoomLevel={18}>
                <MapView.Marker
                    ref={ref => {
                        currentLocMarker.current = ref
                        setTimeout(() => currentLocMarker.current.showCallout(), 1)
                    }}
                    coordinate={{
                        latitude: 1.29027,
                        longitude: 103.851959,
                    }}
                >
                    <Image
                        source={require("../assets/navigation/icons8-navigation-48.png")}
                        style={{ width: 48, height: 48 }}
                    />
                    <LocationCallout />
                </MapView.Marker>
            </MapView>
            <BottomBar />
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
