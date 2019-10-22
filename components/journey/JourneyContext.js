import React, { createContext, useReducer } from "react"

const JourneyContext = createContext()

const initialState = {
    journeyDetails: null,
    journeyStepIdx: 0,
    journeyStepSubIdx: 0,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "setJourneyDetails":
            console.log("Setting journey details")
            return {
                ...state,
                journeyDetails: action.journeyDetails,
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
