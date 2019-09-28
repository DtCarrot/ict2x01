import React, { createContext, useReducer } from "react"

const SearchBarContext = createContext()

const initialState = {
    showSearchBar: false,
    text: "",
    places: [],
    selectedPlaceObj: null,
}

const reducer = (state, action) => {
    switch (action.type) {
        case "setTargetLocation":
            return {
                ...state,
                selectedPlaceObj: action.placeObj,
            }
        case "changePlace":
            return {
                ...state,
                places: action.places,
            }
        case "toggleSearchBar":
            console.log("Toggling search bar")
            return {
                ...state,
                showSearchBar: !state.showSearchBar,
            }
        default:
            return initialState
    }
}

const SearchBarProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    console.log("Current state: ", state)
    const value = { state, dispatch }
    return <SearchBarContext.Provider value={value}>{children}</SearchBarContext.Provider>
}

const SearchBarConsumer = SearchBarContext.Consumer
export { SearchBarContext, SearchBarProvider, SearchBarConsumer }
