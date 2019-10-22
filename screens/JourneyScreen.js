import React, { Component, useRef, useEffect, useState } from "react"
import { Text } from "native-base"
import { View } from "react-native"
import MapView from "react-native-maps"
import * as Permissions from "expo-permissions"
import * as Location from "expo-location"

const JourneyScreen = ({ navigation }) => {
    const mapRef = useRef()
    const [journeyRoute, setJourneyRoute] = useState(null)
    console.log("Navigation ref: ", navigation.getParam("journeyRoute", null))
    useEffect(() => {
        const currJourneyRoute = navigation.getParam("journeyRoute", null)
        setJourneyRoute(currJourneyRoute)
        const _getLocationAsync = async () => {
            const { status } = await Permissions.askAsync(Permissions.LOCATION)
            if (status !== "granted") {
                console.log("Denied")
            } else {
                setInterval(async () => {
                    const location = await Location.getCurrentPositionAsync({})
                    // console.log("Location: ", location)
                    const {
                        coords: { latitude, longitude, heading, altitude },
                    } = location
                    const cameraObj = {
                        center: {
                            latitude,
                            longitude,
                        },
                        pitch: 90,
                        heading,
                        zoom: 20,
                        altitude,
                    }
                    mapRef.current.setCamera(cameraObj)
                }, 5000)
            }
        }
        _getLocationAsync()
    }, [])
    const getLayout = async () => {}
    return (
        <View
            style={{
                flex: 1,
                zIndex: 12,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#ecf0f1",
            }}
        >
            <MapView
                ref={mapRef}
                camera={{
                    center: {
                        latitude: 37.2741004,
                        longitude: -76.6502307,
                    },
                    pitch: 90,
                    heading: 72,
                    zoom: 20,
                    altitude: 0,
                }}
                style={{ zIndex: 200, alignSelf: "stretch", flex: 1 }}
                onLayout={() => getLayout()}
                // mapType="satellite"
                initialRegion={{
                    latitude: 3.2741004,
                    longitude: -76.6502307,
                    latitudeDelta: 0.002,
                    longitudeDelta: 0.001,
                }}
            >
                {journeyRoute !== null && (
                    <MapView.Polyline
                        coordinates={journeyRoute.overview_polyline}
                        strokeWidth={2}
                        strokeColor="red"
                    />
                )}
            </MapView>
        </View>
    )
}

export default JourneyScreen
