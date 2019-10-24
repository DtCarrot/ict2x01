import React, { Fragment, useState, useContext, useEffect } from "react"
import { JourneyContext, JourneyProvider } from "./JourneyContext"

const METRES_PER_CHANCE = 200
const DistanceManager = () => {
    const { state, dispatch } = useContext(JourneyContext)
    const [modalVisible, setModalVisible] = useState(false)
    const { distanceTravelled, currentAvailChance, totalChance } = state
    useEffect(() => {
        const minDistanceForNextReward = METRES_PER_CHANCE * (totalChance + 1)
        if (distanceTravelled >= minDistanceForNextReward) {
            console.log("Adding chance")
            dispatch({
                type: "updateRewardChance",
                currentAvailChance: currentAvailChance + 1,
                totalChance: totalChance + 1,
            })
        }
    }, [state.distanceTravelled])
    return null
}

export default DistanceManager
