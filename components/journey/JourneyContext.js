import React, { createContext, useReducer } from "react"

const JourneyContext = createContext()

const initialState = {
    distanceTravelled: 0,
    journeyDetails: null,
    gpsPosition: null,
    journeyStepIdx: 0,
    journeyStepSubIdx: 0,
    currPolyline: null,
    currentAvailChance: 1,
    lastKnownPosition: null,
    totalChance: 1,
    gameDialogOpen: false,
}

const reducer = (state, action) => {
    console.log("Prev state: ", state)
    switch (action.type) {
        case "toggleGameDialog":
            return {
                ...state,
                gameDialogOpen: action.open,
            }
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
