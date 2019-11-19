import React, { Component, useContext, useRef, useEffect, useState } from "react"
import flattenDeep from "lodash/fp/flattenDeep"
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
import EndJourneyPromptDialog from "../components/journey/EndJourneyPromptDialog"
import { checkAllDistance, checkReachedDestination } from "../components/journey/distanceCalculator"

import { startJourney } from "../db/journeyService"

const JourneyScreen = ({ navigation }) => {
    const { state, dispatch } = useContext(JourneyContext)
    const headingRef = useRef(null)
    const dateTimeRef = useRef(null)
    const locationRef = useRef(null)
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
        const watchHeading = async () => {
            // Watch for update in location heading even in background
            const headingEventListener = await Location.watchHeadingAsync(heading => {
                const {
                    gpsPosition: { heading: currHeading },
                } = state
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
                // Update the heading arrow on the journey navigation UI
                if (currHeading === null || Math.abs(currHeading - magHeading) > 5) {
                    dispatch({ type: "setGPSHeading", heading: magHeading })
                    const cameraObj = {
                        heading: magHeading,
                    }
                    mapRef.current.animateCamera(cameraObj, { duration: 100 })
                }
            })
            headingRef.current = headingEventListener
        }
        watchHeading()
    }, [])

    useEffect(() => {
        // Create cleanup return function when component
        // unmounts
        console.log("Setting cleanup function")
        return () => {
            console.log("----Cleaning up----")
            if (headingRef.current !== null) {
                headingRef.current.remove()
            }
            if (locationRef.current !== null) {
                locationRef.current.remove()
            }
            // useInterval(checkGPSPosition, null)
        }
    }, [])
    const checkGPSPosition = async currPosition => {
        console.log("Checking position")
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
        // const nextTarget = journeyDetails.legs[0].steps[journeyStepIdx].steps[journeyStepSubIdx]
        const journeyStepTarget = journeyDetails.legs[0].steps[journeyStepIdx]
        console.log("Step Target: ", journeyStepTarget)
        let nextTarget = null
        if ("steps" in journeyStepTarget) {
            nextTarget = journeyStepTarget.steps[journeyStepSubIdx]
        } else {
            nextTarget = journeyStepTarget
        }

        await getGPSPosition()
        const { latitude: currLat, longitude: currLng } = currPosition

        if (checkReachedDestination(journeyDetails, { currLat, currLng })) {
            dispatch({
                type: "toggleEndJourney",
                open: true,
            })
            console.log("Reached destination")
            return
        } else {
            console.log("Not reached")
        }

        const closeDistanceList = checkAllDistance(journeyDetails, { currLat, currLng })
        console.log("Distance: ", closeDistanceList)

        // Update the current navigation step
        // If there is a point within 20 metres
        if (closeDistanceList.length > 0) {
            let { innerStep, outerStep, distance } = closeDistanceList[0]
            // Check if the closest distance is the final destination.
            let oldStep = journeyDetails.legs[0].steps[outerStep]
            let newOuterStep = outerStep
            let newInnerStep = innerStep
            if ("steps" in oldStep) {
                // Check whether end of current inner step
                const oldInnerStepLen = oldStep.steps.length
                if (innerStep === oldInnerStepLen - 1) {
                    newOuterStep = outerStep + 1
                    const newStep = journeyDetails.legs[0].steps[newOuterStep]
                    if ("steps" in newStep) {
                        newInnerStep = 0
                    } else {
                        newInnerStep = null
                    }
                } else {
                    newInnerStep++
                }
            } else {
                newOuterStep++
                const newStep = journeyDetails.legs[0].steps[newOuterStep]
                if ("steps" in newStep) {
                    newInnerStep = 0
                } else {
                    newInnerStep = null
                }
            }
            console.log("Dispatching")
            console.log("New outer step: ", newOuterStep, "New inner step: ", newInnerStep)
            dispatch({
                type: "setJourneyStep",
                journeyStepIdx: newOuterStep,
                journeyStepSubIdx: newInnerStep,
            })
        }

        // If there is a GPS position,
        // we update the distance travelled. This is esential
        // for giving game points to the user
        if (lastKnownPosition !== null) {
            const distanceBetweenCurrAndPrevGPS = getPreciseDistance(
                {
                    latitude: currLat,
                    longitude: currLng,
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
    }
    useEffect(() => {
        const trackPosition = async () => {
            const locationEvent = Location.watchPositionAsync(
                {
                    timeInterval: 10000,
                },
                checkGPSPosition
            )
            // locationRef.current = locationEvent
        }
        trackPosition()
    }, [])

    // Run an interval to constantly check for the current GPS Position
    // useInterval(checkGPSPosition, 30000)

    const transformRoute = route => {
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

        const routeObj = {
            ...route,
            overview_polyline: flattenDeep(routeCoord),
        }
        return routeObj
    }

    useEffect(() => {
        const init = async () => {
            await startJourney()
            // We start by initialize the journey information
            const currJourneyRoute = navigation.getParam("journeyRoute", null)
            dispatch({
                type: "setJourneyDetails",
                journeyDetails: transformRoute(sampleRoutes),
            })
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
        }
        init()
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
                            }}
                        />
                    </MapView.Marker>
                )}
            </MapView>
            <DirectionsBar />
            <GameDialog />
            <JourneyRewardBar />
            <BottomJourneyBar onUserFocus={onUserFocus} />
            <EndJourneyPromptDialog />
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
