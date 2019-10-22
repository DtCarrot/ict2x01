import React, { Component, useContext, useRef, useEffect, useState } from "react"
import { Text } from "native-base"
import Polyline from "@mapbox/polyline"
import { View } from "react-native"
import MapView from "react-native-maps"
import * as Permissions from "expo-permissions"
import * as Location from "expo-location"
import DirectionsBar from "../components/journey/DirectionsBar"
import sampleRoutes from "../components/map/sampleRoutes"
import { JourneyContext, JourneyProvider } from "../components/journey/JourneyContext"

const JourneyScreen = ({ navigation }) => {
    const { state, dispatch } = useContext(JourneyContext)
    const mapRef = useRef()
    const [journeyRoute, setJourneyRoute] = useState(null)

    const transformRoute = route => {
        let points = Polyline.decode(route.overview_polyline.points)
        let coords = points.map((point, index) => {
            const pointCoords = {
                latitude: point[0],
                longitude: point[1],
            }
            return pointCoords
        })
        const routeObj = {
            ...route,
            overview_polyline: coords,
        }
        return routeObj
    }

    // console.log("Navigation ref: ", navigation.getParam("journeyRoute", null))
    useEffect(() => {
        const currJourneyRoute = navigation.getParam("journeyRoute", null)
        dispatch({
            type: "setJourneyDetails",
            journeyDetails: currJourneyRoute,
        })
        console.log("At journey screen")
        // console.log(currJourneyRoute.overview_polyline)
        // setJourneyRoute(currJourneyRoute)
        // console.log("Sample Routes: ", sampleRoutes)
        setJourneyRoute(transformRoute(sampleRoutes))
        const _getLocationAsync = async () => {
            const { status } = await Permissions.askAsync(Permissions.LOCATION)
            if (status !== "granted") {
                console.log("Denied")
            } else {
                setTimeout(async () => {
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
                        pitch: 60,
                        heading,
                        zoom: 20,
                        altitude,
                    }
                    mapRef.current.setCamera(cameraObj)
                }, 1000)
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
                {state.journeyDetails !== null && (
                    <MapView.Polyline
                        coordinates={state.journeyDetails.overview_polyline}
                        strokeWidth={2}
                        strokeColor="red"
                    />
                )}
            </MapView>
            {state.journeyDetails !== null && <DirectionsBar journeyRoute={state.journeyDetails} />}
        </View>
    )
}

const withContext = Component => props => {
    return (
        <JourneyProvider>
            <Component {...props} />
        </JourneyProvider>
    )
}

export default withContext(JourneyScreen)
