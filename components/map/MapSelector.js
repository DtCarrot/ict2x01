import React, { useRef, useState, useEffect, useContext } from "react"
import LocationCallout from "./LocationCallout"
import { Image, View, StyleSheet, Text } from "react-native"
import MapView from "react-native-maps"
import Polyline from "@mapbox/polyline"
import { SearchBarContext } from "../search/SearchBarContext"
import { RouteContext } from "../routes/RouteContext"
import * as Permissions from "expo-permissions"
import * as Location from "expo-location"
const GOOGLE_DIRECTION_API_KEY = "AIzaSyC2lJ_zm7nE5mU0252mbfbJd1BebTxTDu8"
const mapRegion = {
    latitude: 1.29027,
    longitude: 103.851959,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
}
const edgePadding = {
    top: 15,
    left: 15,
    right: 15,
    bottom: 15,
}

const MapSelector = () => {
    const currentLocMarker = useRef()
    const targetLocMarker = useRef()
    const mapRef = useRef(null)
    const [markerLoaded, setMarkerLoaded] = useState(false)
    const [location, setLocation] = useState(null)
    // const [routeState, setRoutes] = useState(null)
    const [currCoord, setCurrCoord] = useState(null)
    const { state, dispatch } = useContext(SearchBarContext)
    const { state: routeState, dispatch: routeDispatch } = useContext(RouteContext)
    const getReverseGeocode = async (lat, lng) => {
        const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_DIRECTION_API_KEY}`
        console.log(geocodeUrl)
        let resp = await fetch(geocodeUrl)
        let respJson = await resp.json()
        console.log("Response json: ", respJson)
        return respJson.results[0].formatted_address
    }
    useEffect(() => {
        const _getLocationAsync = async () => {
            const { status } = await Permissions.askAsync(Permissions.LOCATION)
            if (status !== "granted") {
                console.log("Denied")
            } else {
                const location = await Location.getCurrentPositionAsync({})
                console.log("Location: ", location)
                const {
                    coords: { latitude, longitude },
                } = location
                setCurrCoord({
                    latitude,
                    longitude,
                })
                const name = await getReverseGeocode(latitude, longitude)
                setLocation(name)
                mapRef.current.animateCamera({
                    center: {
                        latitude,
                        longitude,
                    },
                    zoom: 18,
                })
            }
        }
        _getLocationAsync()
    }, [])
    // fetch directions and decode polylines
    const getDirections = async (startLoc, destinationLoc) => {
        try {
            const directionUrl = `https://maps.googleapis.com/maps/api/directions/json?mode=transit&origin=${startLoc}&alternatives=true&destination=${destinationLoc}&key=${GOOGLE_DIRECTION_API_KEY}`
            console.log("Direction URL: ", directionUrl)
            let resp = await fetch(directionUrl)
            let respJson = await resp.json()
            const fitCoords = []
            // console.log("Routes list: ", respJson)
            const routesList = respJson.routes.slice(0, 3).map(route => {
                let points = Polyline.decode(route.overview_polyline.points)
                let coords = points.map((point, index) => {
                    const pointCoords = {
                        latitude: point[0],
                        longitude: point[1],
                    }
                    fitCoords.push(pointCoords)
                    return pointCoords
                })
                const routeObj = {
                    ...route,
                    overview_polyline: coords,
                }
                return routeObj
            })
            routeDispatch({ type: "setRouteDetails", routeDetails: routesList })
            mapRef.current.fitToCoordinates(fitCoords, { edgePadding })
        } catch (error) {
            console.log(error)
            return error
        }
    }
    useEffect(() => {
        const getDirectionsAPI = async () => {
            const { lat, lng } = state.selectedPlaceObj
            const startLoc = `${currCoord.latitude},${currCoord.longitude}`
            const endLoc = `${lat},${lng}`
            await getDirections(startLoc, endLoc)
        }
        if (state.selectedPlaceObj !== null) {
            getDirectionsAPI()
            // targetLocMarker.current.showCallout()
        }
    }, [state.selectedPlaceObj])

    useEffect(() => {
        // console.log("Marker status: ", markerLoaded)
        if (markerLoaded) {
            currentLocMarker.current.showCallout()
        }
    }, [markerLoaded])

    const { currRouteIdx, routeDetails } = routeState
    useEffect(() => {
        if (currRouteIdx >= 0 && routeDetails !== null) {
            const currRouteDetails = routeState.routeDetails[routeState.currRouteIdx]
            const fitPositions = [...currRouteDetails.overview_polyline, ...[currCoord]]
            mapRef.current.fitToCoordinates(fitPositions, { edgePadding })
        }
    }, [currRouteIdx])

    const renderRoutes = routes => {
        const currRouteDetails = routeState.routeDetails[routeState.currRouteIdx]
        // currRouteDetails.concat(currCoord)
        // const fitPositions = []
        // fitPositions.concat(currCoord)
        // fitPositions.concat(currRouteDetails.overview_polyline)
        const fitPositions = [...currRouteDetails.overview_polyline, ...[currCoord]]

        // return routeState.routeDetails[routeState.currRouteIdx].map((route, idx) => {
        // return (
        return (
            <MapView.Polyline
                coordinates={currRouteDetails.overview_polyline}
                strokeWidth={2}
                strokeColor="red"
            />
        )
        // )
        // })
    }

    return (
        <MapView
            style={{ zIndex: 200, alignSelf: "stretch", flex: 1 }}
            region={mapRegion}
            ref={mapRef}
            minZoomLevel={5}
            maxZoomLevel={18}
            zoomControlEnabled={true}
        >
            {routeState != null &&
                routeState.routeDetails !== null &&
                renderRoutes(routeState.routeDetails)}
            {currCoord !== null && (
                <MapView.Marker
                    ref={ref => {
                        currentLocMarker.current = ref
                        setTimeout(() => {
                            if (currentLocMarker.current !== null) {
                                currentLocMarker.current.showCallout()
                            }
                        }, 1)
                    }}
                    coordinate={currCoord}
                >
                    <Image
                        source={require("../../assets/navigation/maps-and-flags.png")}
                        style={{ width: 48, height: 48 }}
                    />
                    {location !== null && <LocationCallout name={location} />}
                </MapView.Marker>
            )}
            {state.selectedPlaceObj !== null && (
                <MapView.Marker
                    ref={ref => {
                        targetLocMarker.current = ref
                    }}
                    coordinate={{
                        latitude: state.selectedPlaceObj.lat,
                        longitude: state.selectedPlaceObj.lng,
                    }}
                >
                    <Image
                        source={require("../../assets/navigation/maps-and-flags.png")}
                        style={{ width: 48, height: 48 }}
                    />
                    <LocationCallout name={state.selectedPlaceObj.description} />
                </MapView.Marker>
            )}
        </MapView>
    )
}

export default MapSelector
