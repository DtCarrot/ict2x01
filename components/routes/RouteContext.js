import React, { createContext, useReducer } from "react"

const RouteContext = createContext()

const initialState = {
    routeDetails: null,
}

const reducer = (state, action) => {
    switch (action.type) {
        case "setRouteDetails":
            return {
                ...state,
                routeDetails: action.routeDetails,
            }
        default:
            return initialState
    }
}

const RouteProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const value = { state, dispatch }
    return <RouteContext.Provider value={value}>{children}</RouteContext.Provider>
}

const RouteConsumer = RouteContext.Consumer
export { RouteContext, RouteProvider, RouteConsumer }
