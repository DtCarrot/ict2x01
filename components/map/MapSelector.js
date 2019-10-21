import React, { useRef, useState, useEffect, useContext } from "react"
import LocationCallout from "./LocationCallout"
import { Image, View, StyleSheet, Text } from "react-native"
import MapView from "react-native-maps"
import Polyline from "@mapbox/polyline"
import { SearchBarContext } from "../search/SearchBarContext"
import { RouteContext } from "../routes/RouteContext"
const GOOGLE_DIRECTION_API_KEY = "AIzaSyC2lJ_zm7nE5mU0252mbfbJd1BebTxTDu8"
const mapRegion = {
    latitude: 1.29027,
    longitude: 103.851959,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
}
const MapSelector = () => {
    const currentLocMarker = useRef()
    const mapRef = useRef(null)
    const [markerLoaded, setMarkerLoaded] = useState(false)
    // const [routeState, setRoutes] = useState(null)
    const { state, dispatch } = useContext(SearchBarContext)
    const { state: routeState, dispatch: routeDispatch } = useContext(RouteContext)
    // fetch directions and decode polylines
    const getDirections = async (startLoc, destinationLoc) => {
        try {
            const directionUrl = `https://maps.googleapis.com/maps/api/directions/json?mode=transit&origin=${startLoc}&alternatives=true&destination=${destinationLoc}&key=${GOOGLE_DIRECTION_API_KEY}`
            let resp = await fetch(directionUrl)
            let respJson = await resp.json()
            const fitCoords = []
            console.log("Routes list: ", respJson)
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
            const edgePadding = {
                top: 20,
                left: 20,
                right: 20,
                bottom: 20,
            }
            mapRef.current.fitToCoordinates(fitCoords, { edgePadding })
        } catch (error) {
            console.log(error)
            return error
        }
    }
    useEffect(() => {
        const getDirectionsAPI = async () => {
            const { lat, lng } = state.selectedPlaceObj
            const startLoc = `${mapRegion.latitude},${mapRegion.longitude}`
            const endLoc = `${lat},${lng}`
            await getDirections(startLoc, endLoc)
        }
        if (state.selectedPlaceObj !== null) {
            getDirectionsAPI()
        }
    }, [state.selectedPlaceObj])

    useEffect(() => {
        console.log("Marker status: ", markerLoaded)
        if (markerLoaded) {
            currentLocMarker.current.showCallout()
        }
    }, [markerLoaded])

    const renderRoutes = routes => {
        console.log("Route Test:", routes)
        return routes.map((route, idx) => {
            return (
                <MapView.Polyline
                    key={idx}
                    coordinates={route.overview_polyline}
                    strokeWidth={2}
                    strokeColor="red"
                />
            )
        })
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
                    source={require("../../assets/navigation/icons8-navigation-48.png")}
                    style={{ width: 48, height: 48 }}
                />
                <LocationCallout />
            </MapView.Marker>
            {state.selectedPlaceObj !== null && (
                <MapView.Marker
                    coordinate={{
                        latitude: state.selectedPlaceObj.lat,
                        longitude: state.selectedPlaceObj.lng,
                    }}
                >
                    <Image
                        source={require("../../assets/navigation/icons8-navigation-48.png")}
                        style={{ width: 48, height: 48 }}
                    />
                    <LocationCallout />
                </MapView.Marker>
            )}
        </MapView>
    )
}

export default MapSelector
