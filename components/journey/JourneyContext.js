import React, { createContext, useReducer } from "react"

const JourneyContext = createContext()

const initialState = {
    distanceTravelled: 0,
    journeyDetails: null,
    gpsPosition: {
        latitude: null,
        longitude: null,
        heading: null,
    },
    journeyStepIdx: 0,
    journeyStepSubIdx: 0,
    currPolyline: null,
    currentAvailChance: 5,
    lastKnownPosition: null,
    totalChance: 5,
    finished: false,
    gameInProgress: true,
    gameDialogOpen: false,
    gameType: null,
    endJourneyDialogOpen: false,
    quizCorrect: false,
    quizAnswered: false,
    navigationToggleOpen: false,
}

const reducer = (state, action) => {
    switch (action.type) {
        case "startGame":
            return {
                ...state,
                gameType: action.gameType,
                finished: false,
                quizAnswered: false,
                quizCorrect: false,
                // quizAnswered: true,
                // quizCorrect: true,
                // finished: true,
            }
        case "endGame":
            return {
                ...state,
                finished: true,
            }
        case "toggleNavigationDirection":
            return {
                ...state,
                navigationToggleOpen: action.open,
            }
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
                // gpsPosition: action.gpsPosition,
                gpsPosition: {
                    ...state.gpsPosition,
                    latitude: action.latitude,
                    longitude: action.longitude,
                },
            }
        case "setGPSHeading":
            return {
                ...state,
                gpsPosition: {
                    ...state.gpsPosition,
                    heading: action.heading,
                },
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
        case "toggleEndJourney":
            return {
                ...state,
                endJourneyDialogOpen: action.open,
            }
        case "answerQuestion":
            return {
                ...state,
                quizAnswered: true,
                quizCorrect: action.quizCorrect,
                finished: true,
            }
        case "resetQuestion":
            return {
                ...state,
                quizAnswered: false,
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
