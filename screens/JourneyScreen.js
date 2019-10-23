import React, { Component, useContext, useRef, useEffect, useState } from "react"
import { Text } from "native-base"
import Polyline from "@mapbox/polyline"
import { View, Image } from "react-native"
import MapView from "react-native-maps"
import * as Permissions from "expo-permissions"
import * as Location from "expo-location"
import DirectionsBar from "../components/journey/DirectionsBar"
import sampleRoutes from "../components/map/sampleRoutes"
import { JourneyContext, JourneyProvider } from "../components/journey/JourneyContext"
import useInterval from "../utils/useInterval"
// import Svg, { Image } from "react-native-svg"
// import Image from "react-native-remote-svg"

import { getPreciseDistance, getCompassDirection } from "geolib"

const JourneyScreen = ({ navigation }) => {
    const { state, dispatch } = useContext(JourneyContext)
    const mapRef = useRef()
    const [journeyRoute, setJourneyRoute] = useState(null)
    const [initialRender, setInitialRender] = useState(false)
    // Update the position every 30 seconds
    useInterval(() => {
        const { gpsPosition, journeyDetails, journeyStepIdx, journeyStepSubIdx } = state
        const nextTarget = journeyDetails.legs[0].steps[journeyStepIdx].steps[journeyStepSubIdx]
        console.log("GPS Target: ", nextTarget)
        // Get the distance between the current and target destination
        const distance = getPreciseDistance(
            {
                latitude: gpsPosition.latitude,
                longitude: gpsPosition.longitude,
            },
            {
                latitude: nextTarget.end_location.lat,
                longitude: nextTarget.end_location.lng,
            }
        )
        console.log("Distance: ", distance)
    }, 30000)

    const transformRoute = route => {
        console.log(route.overview_polyline.points)
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
        // dispatch({
        //     type: "setJourneyDetails",
        //     journeyDetails: currJourneyRoute,
        // })
        dispatch({
            type: "setJourneyDetails",
            journeyDetails: transformRoute(sampleRoutes),
        })
        console.log("At journey screen")
        // console.log(currJourneyRoute.overview_polyline)
        // setJourneyRoute(currJourneyRoute)
        // console.log("Sample Routes: ", sampleRoutes)
        // setJourneyRoute(transformRoute(sampleRoutes))
        const _getLocationAsync = async () => {
            const { status } = await Permissions.askAsync(Permissions.LOCATION)
            console.log("Status: ", status)
            if (status !== "granted") {
                console.log("Denied")
            } else {
                setTimeout(async () => {
                    console.log("Getting current position")
                    const location = await Location.getCurrentPositionAsync({})
                    console.log("Location: ", location)
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
                    console.log("Setting position: ", cameraObj)
                    mapRef.current.setCamera(cameraObj)
                    dispatch({
                        type: "setGPSPosition",
                        gpsPosition: {
                            latitude,
                            longitude,
                            heading,
                        },
                    })
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
            >
                {state.journeyDetails !== null && (
                    <MapView.Polyline
                        coordinates={state.journeyDetails.overview_polyline}
                        strokeWidth={2}
                        strokeColor="red"
                    />
                )}
                {state.gpsPosition !== null && (
                    <MapView.Marker
                        coordinate={{
                            latitude: state.gpsPosition.latitude,
                            longitude: state.gpsPosition.longitude,
                        }}
                        rotation={state.gpsPosition.heading}
                    >
                        <Image
                            source={require("../assets/navigation/icons8-upward-arrow-64.png")}
                            style={{
                                width: 48,
                                height: 48,
                                transform: [{ rotate: `${state.gpsPosition.heading}deg` }],
                            }}
                        />
                    </MapView.Marker>
                )}
            </MapView>
            <DirectionsBar />
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
