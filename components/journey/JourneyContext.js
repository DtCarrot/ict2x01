import React, { createContext, useReducer } from "react"

const JourneyContext = createContext()

const initialState = {
    journeyDetails: null,
    gpsPosition: null,
    journeyStepIdx: 0,
    journeyStepSubIdx: 0,
}

const reducer = (state, action) => {
    switch (action.type) {
        case "setJourneyDetails":
            return {
                ...state,
                journeyDetails: action.journeyDetails,
            }
        case "setGPSPosition":
            return {
                ...state,
                gpsPosition: action.gpsPosition,
            }
        case "setJourneyStep":
            return {
                ...state,
                journeyStepIdx: action.journeyStepIdx,
                journeyStepSubIdx: action.journeyStepSubIdx,
            }
        default:
            return initialState
    }
}

const JourneyProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const value = { state, dispatch }
    return <JourneyContext.Provider value={value}>{children}</JourneyContext.Provider>
}

const JourneyConsumer = JourneyContext.Consumer
export { JourneyContext, JourneyProvider, JourneyConsumer }
