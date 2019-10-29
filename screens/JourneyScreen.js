import React, { Component, useContext, useRef, useEffect, useState } from "react"
import flattenDeep from "lodash/fp/flattenDeep"
import { Text } from "native-base"
import Polyline from "@mapbox/polyline"
import { View, Image } from "react-native"
import MapView from "react-native-maps"
import * as Permissions from "expo-permissions"
import * as Location from "expo-location"
import CurrJourneyPolyline from "../components/journey/CurrJourneyPolyline"
import DirectionsBar from "../components/journey/DirectionsBar"
import sampleRoutes from "../components/map/sampleRoutes"
import { JourneyContext, JourneyProvider } from "../components/journey/JourneyContext"
import useInterval from "../utils/useInterval"
import { differenceInSeconds } from "date-fns/fp"
import { getPreciseDistance, getCompassDirection } from "geolib"
import DistanceManager from "../components/journey/DistanceManager"
import JourneyRewardBar from "../components/journey/JourneyRewardBar"
import GameDialog from "../components/journey/GameDialog"
import mapStyles from "../components/map/mapStyles"
import BottomJourneyBar from "../components/journey/BottomJourneyBar"

const JourneyScreen = ({ navigation }) => {
    const { state, dispatch } = useContext(JourneyContext)
    const dateTimeRef = useRef(null)
    const mapRef = useRef()
    const [journeyRoute, setJourneyRoute] = useState(null)
    const [initialRender, setInitialRender] = useState(false)
    const [currPolyline, setCurrPolyline] = useState(null)
    const getGPSPosition = async () => {
        const location = await Location.getCurrentPositionAsync({})
        console.log("Heading: ", location)
        const {
            coords: { latitude, longitude, heading, altitude },
        } = location
        dispatch({
            type: "setGPSPosition",
            latitude,
            longitude,
        })
        return { latitude, longitude, heading, altitude }
    }
    const onUserFocus = async () => {
        console.log("Getting gps position")
        const { latitude, longitude, heading, altitude } = await getGPSPosition()
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
        console.log("Camera obj: ", cameraObj)
        mapRef.current.setCamera(cameraObj)
    }
    useEffect(() => {
        Location.watchHeadingAsync(heading => {
            const {
                gpsPosition: { heading: currHeading },
            } = state
            console.log("Heading: ", heading)
            const { magHeading } = heading
            const currentTime = new Date()
            // If the time is not null
            if (dateTimeRef.current !== null) {
                const diffSeconds = differenceInSeconds(dateTimeRef.current, currentTime)
                if (diffSeconds < 3) {
                    return false
                }
                dateTimeRef.current = currentTime
            }
            console.log("State: ", state.gpsPosition)
            console.log("Curr Heading: ", currHeading, "Mag heading: ", magHeading)
            console.log("Heading diff: ", Math.abs(currHeading - magHeading))
            if (currHeading === null || Math.abs(currHeading - magHeading) > 5) {
                dispatch({ type: "setGPSHeading", heading: magHeading })
                const cameraObj = {
                    heading: magHeading,
                }
                console.log("Camera obj: ", cameraObj)
                mapRef.current.animateCamera(cameraObj, { duration: 300 })
            }
        })
    }, [])
    // Update the position every 30 seconds
    useInterval(async () => {
        // console.log("Journey details: ", state.journeyDetails.overview_polyline)
        if (state.journeyDetails === null) {
            return
        }
        const {
            lastKnownPosition,
            gpsPosition,
            journeyDetails,
            journeyStepIdx,
            journeyStepSubIdx,
        } = state
        const nextTarget = journeyDetails.legs[0].steps[journeyStepIdx].steps[journeyStepSubIdx]
        console.log("Journey step: ", journeyStepIdx, journeyStepSubIdx)
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
        await getGPSPosition()

        if (lastKnownPosition !== null) {
            const distanceBetweenCurrAndPrevGPS = getPreciseDistance(
                {
                    latitude: gpsPosition.latitude,
                    longitude: gpsPosition.longitude,
                },
                lastKnownPosition
            )
            const { distanceTravelled } = state
            // Update the distance that has been travelled
            console.log("Distance: ", distanceBetweenCurrAndPrevGPS, distanceTravelled)
            dispatch({
                type: "updateDistanceTravelled",
                distanceTravelled: distanceTravelled + distanceBetweenCurrAndPrevGPS,
            })
        }

        // Reached destination
        if (distance < 10) {
            // Check the current leg length
            if (journeyStepSubIdx + 1 >= journeyDetails.legs[0].steps[journeyStepIdx].length) {
                dispatch({
                    type: "setJourneyStep",
                    journeyStepIdx: journeyStepIdx + 1,
                    journeyStepSubIdx: 0,
                })
            } else {
                dispatch({
                    type: "setJourneyStep",
                    journeyStepIdx,
                    journeyStepSubIdx: journeyStepSubIdx + 1,
                })
            }
        }
    }, 45000)

    const transformRoute = route => {
        // console.log(route.overview_polyline.points)
        // let points = Polyline.decode(route.overview_polyline.points)
        // let coords = points.map((point, index) => {
        //     const pointCoords = {
        //         latitude: point[0],
        //         longitude: point[1],
        //     }
        //     return pointCoords
        // })
        const leg = route.legs[0]
        const routeCoord = leg.steps.map(step => {
            // console.log("Step: ", step)
            if (step.hasOwnProperty("steps")) {
                return step.steps.map(subStep => {
                    const points = Polyline.decode(subStep.polyline.points)
                    return points.map((point, index) => ({
                        latitude: point[0],
                        longitude: point[1],
                    }))
                })
            } else {
                return Polyline.decode(step.polyline.points).map((point, index) => ({
                    latitude: point[0],
                    longitude: point[1],
                }))
            }
        })

        // console.log("Route coord: ", flattenDeep(routeCoord))
        const routeObj = {
            ...route,
            overview_polyline: flattenDeep(routeCoord),
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
        // console.log("At journey screen", state.journeyDetails.overview_polyline)
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
                // setTimeout(async () => {
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
                mapRef.current.setCamera(cameraObj)
                dispatch({
                    type: "setGPSPosition",
                    latitude,
                    longitude,
                })
                // }, 1000)
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
                customMapStyle={mapStyles}
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
                    <React.Fragment>
                        <MapView.Polyline
                            coordinates={state.journeyDetails.overview_polyline}
                            style={{
                                zIndex: 99,
                            }}
                            strokeWidth={4}
                            strokeColor="#26de81"
                        />
                        <CurrJourneyPolyline />
                        <MapView.Marker
                            coordinate={{
                                latitude: state.journeyDetails.legs[0].end_location.lat,
                                longitude: state.journeyDetails.legs[0].end_location.lng,
                            }}
                        >
                            <Image
                                source={require("../assets/navigation/maps-and-flags.png")}
                                style={{
                                    width: 32,
                                    height: 32,
                                }}
                            />
                        </MapView.Marker>
                    </React.Fragment>
                )}
                {state.gpsPosition.latitude !== null && state.gpsPosition.heading !== null && (
                    <MapView.Marker
                        coordinate={{
                            latitude: state.gpsPosition.latitude,
                            longitude: state.gpsPosition.longitude,
                        }}
                        // rotation={state.gpsPosition.heading + 90}
                        // rotation={90}
                    >
                        <Image
                            source={require("../assets/navigation/icons8-arrow-64.png")}
                            style={{
                                width: 64,
                                height: 64,
                                transform: [
                                    {
                                        rotateY: "15deg",
                                    },
                                    {
                                        rotate: "-90deg",
                                    },
                                ],
                                // {
                                //     rotate: `${state.gpsPosition.heading + 90}deg`,
                                // },
                                // ],
                            }}
                        />
                    </MapView.Marker>
                )}
            </MapView>
            <DirectionsBar />
            <GameDialog />
            <JourneyRewardBar />
            <BottomJourneyBar onUserFocus={onUserFocus} />
        </View>
    )
}

const withContext = Component => props => {
    return (
        <JourneyProvider>
            <DistanceManager />
            <Component {...props} />
        </JourneyProvider>
    )
}

export default withContext(JourneyScreen)
