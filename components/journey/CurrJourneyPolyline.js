import React, { Fragment, useState, useContext, useEffect } from "react"
import MapView from "react-native-maps"
import { JourneyContext } from "./JourneyContext"
import Polyline from "@mapbox/polyline"

const CurrJourneyPolyline = () => {
    const [currPolyline, setCurrPolyline] = useState(null)
    const { state, dispatch } = useContext(JourneyContext)

    useEffect(() => {
        const getCurrentPolyline = () => {
            if (state.journeyDetails !== null) {
                const { journeyDetails, journeyStepIdx, journeyStepSubIdx } = state
                let nextTarget = journeyDetails.legs[0].steps[journeyStepIdx]
                // Check if there is any substeps in the navigation
                if ("steps" in nextTarget) {
                    // Get the substep
                    nextTarget = nextTarget.steps[journeyStepSubIdx]
                }

                console.log("Next target:", nextTarget)
                const points = Polyline.decode(nextTarget.polyline.points)
                let coords = points.map((point, index) => {
                    const pointCoords = {
                        latitude: point[0],
                        longitude: point[1],
                    }
                    return pointCoords
                })
                console.log("Coords: ", coords)
                setCurrPolyline(coords)
            }
        }
        getCurrentPolyline()
    }, [state.journeyDetails, state.journeyStepIdx, state.journeyStepSubIdx])

    return (
        <Fragment>
            {currPolyline !== null && (
                <MapView.Polyline
                    coordinates={currPolyline}
                    style={{
                        zIndex: 101,
                    }}
                    strokeWidth={4}
                    strokeColor="#fc5c65"
                />
            )}
        </Fragment>
    )
}

export default CurrJourneyPolyline
