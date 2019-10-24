import React, { createContext, useReducer } from "react"

const JourneyContext = createContext()

const initialState = {
    distanceTravelled: 0,
    journeyDetails: null,
    gpsPosition: null,
    journeyStepIdx: 0,
    journeyStepSubIdx: 0,
    currPolyline: null,
    currentAvailChance: 0,
    lastKnownPosition: null,
    totalChance: 0,
}

const reducer = (state, action) => {
    console.log("Prev state: ", state)
    switch (action.type) {
        case "setJourneyDetails":
            return {
                ...state,
                journeyDetails: action.journeyDetails,
            }
        case "setGPSPosition":
            return {
                ...state,
                lastKnownPosition: state.gpsPosition,
                gpsPosition: action.gpsPosition,
            }
        case "setJourneyStep":
            console.log("New journey step idx: ", action)
            return {
                ...state,
                journeyStepIdx: action.journeyStepIdx,
                journeyStepSubIdx: action.journeyStepSubIdx,
            }
        case "setCurrPolyline":
            console.log("curr: ", action.currPolyline)
            return {
                ...state,
                currPolyline: action.currPolyline,
            }
        case "updateDistanceTravelled":
            return {
                ...state,
                distanceTravelled: action.distanceTravelled,
            }
        case "updateRewardChance":
            return {
                ...state,
                currentAvailChance: action.currentAvailChance,
                totalChance: action.totalChance,
            }
        default:
            return state
    }
}

const JourneyProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const value = { state, dispatch }
    return <JourneyContext.Provider value={value}>{children}</JourneyContext.Provider>
}

const JourneyConsumer = JourneyContext.Consumer
export { JourneyContext, JourneyProvider, JourneyConsumer }
